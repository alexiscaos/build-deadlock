import { Routes } from '@angular/router';
import { SelectCharacter } from './Components/select-character/select-character';
import { ShopExplorerComponent } from './Components/shop/shop.explorer/shop.explorer.component';

export const routes: Routes = [
    {path: '', component: SelectCharacter},
    {path: 'shop', component: ShopExplorerComponent},
];
