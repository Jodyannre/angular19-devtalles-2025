import { afterEveryRender, afterNextRender, afterRenderEffect, Component, effect } from '@angular/core';

const log = ( ...messages:string[]) => {
  console.log(`${messages[0] } %c${messages.slice(1).join(', ')}`, 'color: #bada55')
}


@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
})
export class HomePage {
  constructor() {
    log('constructor llamado');
  }

  basicEffect = effect(( onCleanup) => {
    log('effect:', 'Disparar efectos secundarios')

    onCleanup(() => {
      log('onCleanUp:', 'Limpiar efectos secundarios, cuando se destruye el efecto.')
    })
  })

  ngOnInit(){ log('ngOnInit llamado', `Runs once after Angular has initialized all the component's inputs.`); }
  ngOnChanges(){ log('ngOnChanges llamado', `Runs every time the component's inputs have changed.`); }
  ngDoCheck(){ log('ngDoCheck llamado', 'Runs every time this component is checked for changes.'); }
  ngAfterContentInit(){ log('ngAfterContentInit llamado', `Runs once after the component's content has been initialized.`); }
  ngAfterContentChecked(){ log('ngAfterContentChecked llamado', `Runs every time this component content has been checked for changes.`); }
  ngAfterViewInit(){ log('ngAfterViewInit llamado', `Runs once after the component's view has been initialized.`); }
  ngAfterViewChecked(){ log('ngAfterViewChecked llamado', `Runs every time the component's view has been checked for changes.`); }
  ngOnDestroy(){ log('ngOnDestroy llamado', 'Runs once before the component is destroyed.'); }
  afterNextRenderEffect = afterNextRender(()=> {
    log('afterNextRenderEffect llamado', `Runs once the next time that all components have been rendered to the DOM.`)
  })
  afterEveryRender = afterEveryRender(()=> {
    log('afterRenderEffect llamado', `Runs every time all components have been rendered to the DOM.`)
  })
}
