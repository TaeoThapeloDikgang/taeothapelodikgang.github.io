import {Component, OnDestroy, OnInit} from '@angular/core';

import { Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {shoppingListReducer} from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // the code above does both getting and subscribing
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  ngOnDestroy() {
    // we dont need to manage ngrx subscriptions
    // this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
