
import { PrecautionComponent } from './precaution.component';
import { inject } from '@angular/core/testing';

export function main() {
    describe('PrecautionComponent', () => {
        beforeEach(() => [
            PrecautionComponent
        ]);
        
        //Manually instantiate PrecautionComponent
        it('should define full name', () => {
            let displayName = new PrecautionComponent();
            displayName.precautionList = [{
              precautionTitle : "Wash your hands frequently.",
              image: "https://media.npr.org/assets/img/2020/03/13/handwashingforrealfinal_custom-7c42912bb35787e71c3611da45198082a3c52e7a-s1100-c15.jpg",
              content : "Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water.",
              reason : "Washing your hands with soap and water or using alcohol-based hand rub kills viruses that may be on your hands."
            }];
            expect(displayName.listAllPrecaution.length).toBe(1);
        });
        
        //Use DI to instantiate PrecautionComponent
        it('should define full name2', inject([PrecautionComponent], (displayName) => {
            displayName.firstName = 'Joe';
            displayName.lastName = 'Smith';
            displayName.generateFullName();
            expect(displayName.fullName).toBe('Joe Smith');
        }));
    });
}