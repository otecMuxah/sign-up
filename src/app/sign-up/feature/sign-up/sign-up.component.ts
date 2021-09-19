import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignUpFacadeService } from '../../domain/sign-up.facade.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  constructor(public signUpFacade: SignUpFacadeService) {}
}
