import { Component } from '@angular/core';

@Component({
  selector: 'app-web.home',
  templateUrl: './web.home.component.html',
  styleUrl: './web.home.component.css'
})
export class WebHomeComponent {
  displayedColumns: string[] = ['product', 'description', 'price', 'action'];

  // Define the products for each category
  category1Products = [
    { name: 'Running Shoes', description: 'High-performance running shoes.', price: 99.99 },
    { name: 'Basketball', description: 'Durable and lightweight basketball.', price: 29.99 }
  ];

  category2Products = [
    { name: 'Yoga Mat', description: 'Comfortable yoga mat for your practice.', price: 19.99 },
    { name: 'Soccer Ball', description: 'High-quality soccer ball for training.', price: 34.99 }
  ];

  category3Products = [
    { name: 'Sports Watch', description: 'Stylish sports watch with heart rate monitor.', price: 149.99 },
    { name: 'Water Bottle', description: 'Insulated water bottle for athletes.', price: 19.99 }
  ];
}
