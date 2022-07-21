form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServicesService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      type: ['',Validators.required],
      uri: ['',Validators.required],
      inputType: ['',Validators.required],
      outputType: ['',Validators.required],
      body: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  submit() {
    const val = this.form.value;
    const service: Service = {
      name: val.name,
      uri: val.uri,
      type: val.type,
      inputType: val.inputType,
      outputType: val.outputType,
      body: JSON.parse(val.body),
    }

    this.serviceService.createService(service)
      .subscribe({
        next: _ => {this.openSnackBar()},
        error: (err) => {
          alert('Error creando servicio');
          console.log(err);
        },
        complete: () => {}
      });
  }

  openSnackBar() {
    this.snackBar.open('Servicio creado correctamente', 'Cerrar', {duration: 3000});
  }
