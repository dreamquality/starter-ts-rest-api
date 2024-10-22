import { faker } from '@faker-js/faker';

export type Pet = { id?: number; name: string; status: 'available' | 'pending' | 'sold'; };
export type User = { username: string; password: string; };

export class DataBuilder {
  private pet: Pet;
  private user: User;

  constructor() {
    this.pet = { name: faker.person.firstName(), status: 'available' };
    this.user = { username: faker.internet.userName(), password: faker.internet.password() };
  }

  withPet(name: string, status: 'available' | 'pending' | 'sold'): DataBuilder {
    this.pet = { name, status };
    return this;
  }

  updatePetStatus(status: 'available' | 'pending' | 'sold'): DataBuilder {
    this.pet.status = status;
    return this;
  }

  buildPet(): Pet {
    return this.pet;
  }

  withUser(username: string, password: string): DataBuilder {
    this.user = { username, password };
    return this;
  }

  buildUser(): User {
    return this.user;
  }
}
