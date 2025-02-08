import { ApiUrl } from '../../config/config';

class Api {
  public url: string = '';
  public auth: boolean = false;
  public type: 'form' | 'json' | 'multipart' = 'json';
  public token: string = '';
  public header: any = {};
  public body: any = {}; // This should not be used in GET requests
  public method: 'GET' | 'POST' | 'PUT' | 'DELETE' | undefined;

  public call = async () => {
    const url = ApiUrl + this.url;
    const headers: any = {
      ...this.header,
    };

    // Set Content-Type based on the type, except for multipart/form-data
    if (this.type === 'json') {
      headers['Content-Type'] = 'application/json';
    } else if (this.type === 'form') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    // Add Authorization header if needed
    if (this.auth && this.token) {
      headers['Authorization'] = 'Bearer ' + this.token;
      headers['Accept'] = 'application/json';
    }

    // Prepare body for non-GET methods (POST, PUT, DELETE)
    let body: BodyInit | undefined;
    if (this.method !== 'GET') {
      if (this.type === 'json') {
        body = JSON.stringify(this.body);
      } else if (this.type === 'form') {
        body = new URLSearchParams(this.body).toString();
      } else {
        body = this.body; // For multipart, assume body is already a FormData object
      }
    }

    const options: RequestInit = {
      method: this.method || 'GET', // Default to GET if no method is set
      headers: headers,
      body: body, // Only include body if method is not GET
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
