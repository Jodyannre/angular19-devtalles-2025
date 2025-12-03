import { Pipe, PipeTransform } from '@angular/core';
import { Color, ColorMap } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroTextColor'
})

export class HeroTextColorPipe implements PipeTransform {
  transform(value: Color): any {
    return ColorMap[value] || { color: 'black' };
  }
}
