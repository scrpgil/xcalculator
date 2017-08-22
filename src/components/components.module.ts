import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { BottomupListComponent } from './bottomup-list/bottomup-list';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
	declarations: [BottomupListComponent],
	imports: [CommonModule, PipesModule],
	exports: [BottomupListComponent]
})
export class ComponentsModule {}
