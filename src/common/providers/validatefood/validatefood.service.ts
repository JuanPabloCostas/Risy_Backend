import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { log } from 'console';

@Injectable()
export class ValidatefoodService {
    private readonly apiUrl = 'https://detect.roboflow.com/bread-mould/2';
  private readonly apiKey = 'Q1V8I4FP2uqDPoVlXRah';

  async validateImage(imageUrl: string): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, null, {
        params: {
          api_key: this.apiKey,
          image: imageUrl,
        },
      });
      return response.data.predictions[0].class;  // Devuelve los datos de la respuesta de Roboflow
    } catch (error) {
      throw new Error(`Error al validar la imagen: ${error.message}`);
    }
  }
}
