import axios, { AxiosResponse } from 'axios';

class RestCalls {
  async get<T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await axios.get<T>(url, {
        headers,
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T, U>(url: string, data: U): Promise<AxiosResponse<T>> {
    try {
      const response = await axios.post<T>(url, data);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T, U>(url: string, data: U): Promise<AxiosResponse<T>> {
    try {
      const response = await axios.put<T>(url, data);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    try {
      const response = await axios.delete<T>(url);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      return new Error(`Axios error: ${error.message}`);
    } else {
      // Handle unexpected errors
      return new Error(`Unexpected error: ${error}`);
    }
  }
}

export default new RestCalls();
