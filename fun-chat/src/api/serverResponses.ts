import { HindInput } from '../components/forms/componentsForm';
import { DataRequestUser, DataResponseUser, UserType } from '../types/serverTypes';

export class ServerResponses {
  data: DataResponseUser;

  constructor(data: DataResponseUser) {
    this.data = data;
    this.loginUser();
  }

  private loginUser() {
    const dataStorage: string | null = sessionStorage.getItem('IF-chat');
    if (dataStorage) {
      const storedData: DataRequestUser = JSON.parse(dataStorage);
      if (this.data.id === storedData.id && this.data.type === storedData.type) {
        if (this.data.payload.user && this.data.payload.user.isLogined === true) {
          window.location.hash = '#main';
        }
      }
      if (this.data.id === storedData.id && this.data.type === UserType.Error) {
        const messageError = new HindInput('message-error').item;
        if (this.data.payload.error) {
          messageError.textContent = this.data.payload.error;
          document.body.appendChild(messageError);
          setTimeout(() => document.body.removeChild(messageError), 7000);
        }
      }
    }
  }
}
