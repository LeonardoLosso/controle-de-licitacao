
import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { UsuariosService } from "../autenticacao/services/usuarios.service";
import { Observable, catchError, map, of, switchMap, timer } from "rxjs";
export class FormValidations {
    static equalTo(otherField: FormControl<string | null>): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const fieldValue = control.value;
            const otherFieldValue = otherField.value;
            if (fieldValue !== otherFieldValue) {
                return { equalTo: true };
            }
            return null;
        };
    }

    static uniqueUsernameValidator(usernameService: UsuariosService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) {
                return of(null);
            }

            return timer(500).pipe(
                switchMap(() => usernameService.ObterUsuario(control.value)),
                map(existe => (existe ? { usernameTaken: true } : null)),
                catchError(() => of(null))
              );
        };
    }
}
