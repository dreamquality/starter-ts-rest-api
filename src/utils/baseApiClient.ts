import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import winston from 'winston';
import * as allure from 'allure-js-commons';

// Настройка логгера с использованием winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console()
  ],
});

// Вспомогательная функция для логирования запроса и ответа в Allure
function logRequestResponseToAllure(
  method: string,
  url: string,
  requestConfig: AxiosRequestConfig,
  response?: AxiosResponse,
  error?: any,
  startTime?: number
): void {
  const endTime = Date.now();
  const duration = startTime ? endTime - startTime : 0;

  // Создаем единый шаг для метода и URL с временем выполнения
  allure.step(`${method.toUpperCase()} ${url} - ${duration}ms`, () => {
    // Вложенные шаги для тела запроса и заголовков
    if (requestConfig.data) {
      allure.step('Request Body', () => {
        const requestBody = JSON.stringify(requestConfig.data, null, 2);
        if (requestBody) {
          allure.attachment('Request Body', requestBody, 'application/json');
        }
      });
    }

    const requestHeaders = JSON.stringify(requestConfig.headers, null, 2);
    allure.step('Request Headers', () => {
      if (requestHeaders) {
        allure.attachment('Request Headers', requestHeaders, 'application/json');
      }
    });

    // Вложенные шаги для тела ответа и заголовков
    if (response) {
      const responseBody = JSON.stringify(response.data, null, 2);
      allure.step('Response Body', () => {
        if (responseBody) {
          allure.attachment('Response Body', responseBody, 'application/json');
        }
      });

      const responseHeaders = JSON.stringify(response.headers, null, 2);
      allure.step('Response Headers', () => {
        if (responseHeaders) {
          allure.attachment('Response Headers', responseHeaders, 'application/json');
        }
      });
    }

    // Вложенные шаги для ошибок
    if (error) {
      allure.step('Error', () => {
        if (error.message) {
          allure.attachment('Error Message', error.message, 'text/plain');
        }

        if (error.response) {
          const errorResponseBody = JSON.stringify(error.response.data, null, 2);
          allure.step('Response Body', () => {
            if (errorResponseBody) {
              allure.attachment('Response Body', errorResponseBody, 'application/json');
            }
          });

          const errorResponseHeaders = JSON.stringify(error.response.headers, null, 2);
          allure.step('Response Headers', () => {
            if (errorResponseHeaders) {
              allure.attachment('Response Headers', errorResponseHeaders, 'application/json');
            }
          });
        }
      });
    }
  });
}

export class BaseApiClient {
  protected client!: AxiosInstance;
  private token: string = ''; // Инициализация токена

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(this.addAuthToken.bind(this));
  }

  private addAuthToken(config: AxiosRequestConfig): AxiosRequestConfig {
    if (!config.headers) config.headers = {}; // Проверка на наличие headers

    if (this.token) {
      config.headers['Authorization'] = `Bearer ${this.token}`;
    }
    return config;
  }

  private async makeRequest<T>(method: Method, url: string, data?: any, params?: any): Promise<T> {
    const requestConfig: AxiosRequestConfig = {
      method, // Используем тип Method
      url,
      data,
      params,
    };

    const startTime = Date.now();

    try {
      const response = await this.client.request<T>(requestConfig);
      logRequestResponseToAllure(method, url, requestConfig, response, undefined, startTime);
      return response.data;
    } catch (error: any) {
      logRequestResponseToAllure(method, url, requestConfig, undefined, error, startTime);
      throw error;
    }
  }

  public async get<T>(url: string, params?: any): Promise<T> {
    return this.makeRequest<T>('GET', url, undefined, params);
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>('POST', url, data);
  }

  public async patch<T>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>('PATCH', url, data);
  }

  public async delete<T>(url: string): Promise<void> {
    await this.makeRequest<T>('DELETE', url);
  }

  public async upload<T>(url: string, filePath: string, fieldName: string = 'file'): Promise<T> {
    if (!fs.existsSync(filePath)) {
      logger.error(`File not found: ${filePath}`);
      throw new Error(`File not found: ${filePath}`);
    }

    const formData = new FormData();
    formData.append(fieldName, fs.createReadStream(filePath));

    return this.makeRequest<T>('POST', url, formData);
  }
}
