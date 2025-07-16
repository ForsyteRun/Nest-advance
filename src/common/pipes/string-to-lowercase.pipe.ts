import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StringToLowercasePipe implements PipeTransform<string> {
  transform(value: any): string {
    if (typeof value !== 'string') {
      return value;
    }
    return value.toLowerCase();
  }
}
