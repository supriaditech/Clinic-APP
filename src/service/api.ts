import { ApiUrl } from '../../config/config';

class Api {
  public url: string = '';
  public auth: boolean = false;
  public type: 'form' | 'json' | 'multipart' = 'json';
  public token: string = '';
  public header: any = {};
  public body: any = {}; // This should not be used in GET requests
  public method: string | undefined;

  public call = async () => {
    const url = ApiUrl + this.url;
    const headers: any = {
      ...this.header,
    };

    // Hanya set Content-Type jika bukan multipart/form-data
    if (this.type === 'json') {
      headers['Content-Type'] = 'application/json';
    } else if (this.type === 'form') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    // Tambahkan Authorization jika dibutuhkan
    if (this.auth && this.token) {
      headers['Authorization'] = 'Bearer ' + this.token;
      headers['Accept'] = 'application/json';
    }

    // Set body hanya jika method bukan GET
    let body: BodyInit | undefined;
    if (this.method !== 'GET') {
      if (this.type === 'json') {
        body = JSON.stringify(this.body);
      } else if (this.type === 'form') {
        body = new URLSearchParams(this.body).toString();
      } else {
        body = this.body; // Jika tipe multipart, body sudah berbentuk FormData
      }
    }

    const options: RequestInit = {
      method: this.method || 'GET', // Pastikan method adalah 'GET' jika belum di-set
      headers: headers,
      body: body, // Hanya kirim body jika tidak GET
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        meta: {
          code: 400,
          status: 'Bad Request',
          message: 'Bad Request',
        },
        data: error,
      };
    }
  };
}

export default Api;
