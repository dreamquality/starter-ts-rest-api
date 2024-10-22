import { BaseApiClient } from '../utils/baseApiClient';
import { DataBuilder, Pet, User } from '../utils/dataBuilder';

// Example tests for Petstore API
describe('Petstore API Tests', () => {
  let apiClient: BaseApiClient;

  beforeEach(() => {
    apiClient = new BaseApiClient(process.env.API_BASE_URL || 'https://petstore.swagger.io/v2');
  });

  it('should create, update, and delete a pet', async () => {
    let pet: Pet = new DataBuilder().withPet('Fluffy', 'available').buildPet();
    let response = await apiClient.post<Pet>('/pet', pet);
    expect(response.name).toBe('Fluffy');

    pet = new DataBuilder().updatePetStatus('sold').buildPet();
    response = await apiClient.put<Pet>(`/pet/${response.id}`, { status: pet.status });
    expect(response.status).toBe('sold-');

    await apiClient.delete<void>(`/pet/${response.id}`);
  });
});
