
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export class FormValidations {
    static equalTo(otherField: FormControl<string | null>): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const fieldValue = control.value;
            const otherFieldValue = otherField.value;
            if(fieldValue !== otherFieldValue) {
                return { equalTo: true};
            }
            return null;
        };
    }
}
