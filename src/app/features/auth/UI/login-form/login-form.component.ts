import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@/features/auth';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder);

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.getRawValue());
  }
}
