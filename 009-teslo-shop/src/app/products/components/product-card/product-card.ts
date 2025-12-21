import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>();
}
