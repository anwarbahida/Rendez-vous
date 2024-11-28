
import { PipeTransform, Injectable} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any) {
    console.log(`hana dzt mn validation ${value}`)
    return value ;
  }
}
