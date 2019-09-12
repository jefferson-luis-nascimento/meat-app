import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ErrorHandler{

  static handleError<T>(error: HttpResponse<T>){
    let errorMessage: string;

    if(error instanceof HttpResponse){
      console.log('entrou no tipo');
      errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`;
    }else{
      console.log(typeof error);
      errorMessage = error;
    }

    console.log(errorMessage);
    return Observable.throw;
  }
}
