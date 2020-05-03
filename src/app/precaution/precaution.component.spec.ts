
import { PrecautionComponent } from './precaution.component';
import { inject, TestBed } from '@angular/core/testing';


describe('PrecautionComponent', () => {
        beforeEach(() => [
            TestBed.configureTestingModule({
                declarations: [PrecautionComponent],
                providers: [PrecautionComponent]
              })
        ]);
        
        //Manually instantiate PrecautionComponent
        it('should able to add the precaution in the precautionList', () => {
            let precautionComponent = new PrecautionComponent();
            precautionComponent.ngOnInit();
            precautionComponent.precautionList.push({
              precautionTitle : "Wash your hands frequently.",
              image: "https://media.npr.org/assets/img/2020/03/13/handwashingforrealfinal_custom-7c42912bb35787e71c3611da45198082a3c52e7a-s1100-c15.jpg",
              content : "Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water.",
              reason : "Washing your hands with soap and water or using alcohol-based hand rub kills viruses that may be on your hands."
            });
            expect(precautionComponent.precautionList.length).toBe(5);
        });
        
        //Use DI to instantiate PrecautionComponent
        it('should precaution title match ', inject([PrecautionComponent], (precautionComponent) => {
            precautionComponent.ngOnInit();
            precautionComponent.precautionList;
            expect(precautionComponent.precautionList[0].precautionTitle).toBe('Wash your hands frequently.');
        }));
    });