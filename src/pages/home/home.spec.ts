import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HomePage } from './home';
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

describe('HomePage', () => {
    let de: DebugElement;
    let comp: HomePage;
    let fixture: ComponentFixture<HomePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePage],
            imports: [
                PipesModule,
                ComponentsModule,
                DirectivesModule,
                IonicModule.forRoot(HomePage)
            ],
            providers: [
                NavController,
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        comp = fixture.componentInstance;
    });

    it('should create component', () => expect(comp).toBeDefined());
});
