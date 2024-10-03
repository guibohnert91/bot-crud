import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Transaction, TransactionTypes } from '../../transaction.model';
import { CommonModule } from '@angular/common';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent {
  @Input() transaction!: Transaction | null;
  @Input() isEditing: boolean = false;
  @Output() save = new EventEmitter<Transaction>();
  @Output() close = new EventEmitter<void>();

  transactionForm!: FormGroup;
  transactionTypes = TransactionTypes;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.transactionForm = this.fb.group({
      title: ['', Validators.required],
      type: ['income', Validators.required],
      type2: ['income'],
      amount: [0, [Validators.required, Validators.min(1)]],
      disabled: null,
    });

    this.transactionForm.get('disabled')?.disable();

    if (this.transaction) {
      this.transactionForm.patchValue(this.transaction);
    }
  }

  onSave() {
    if (this.transactionForm.valid) {
      const formValues = this.transactionForm.value;

      this.save.emit({
        ...formValues,
        id: this.transaction?.id || Date.now(),
        date: this.transaction?.date || new Date(),
      });
      this.close.emit();
    }
  }
}
