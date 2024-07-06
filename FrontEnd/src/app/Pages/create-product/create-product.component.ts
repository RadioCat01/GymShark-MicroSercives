import { Component } from '@angular/core';
import { ProductControllerService } from '../../Services/Product/services';
import { ProductRequest } from '../../Services/Product/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  productForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductControllerService
  ) {
    this.productForm = this.fb.group({
      naame: [''],
      category: [''],
      description: [''],
      price: [''],
      availableQuantity: ['']
    });
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.productForm.valid && this.selectedFile) {
      const productRequest: ProductRequest = this.productForm.value;
      const formData: FormData = new FormData();
      formData.append('request', new Blob([JSON.stringify(productRequest)], { type: 'application/json' }));
      formData.append('image', this.selectedFile);

      this.productService.createProduct({ body: { request: productRequest, image: this.selectedFile } }).subscribe(
        (response) => {
          console.log('Product created successfully', response);
        },
        (error) => {
          console.error('Error creating product', error);
        }
      );
    }

  }
}


