import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef
  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomServiceService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }



  appendComponentToBody (component:any, parameters:any) {
    // 1. Create a component reference from the component 
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    let instance:any = componentRef.instance;
    Object.entries(parameters).forEach(([paramName, paramValue]) => {
      instance[paramName] = paramValue;
    })

     // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

     // 3. Get DOM element from component
    const domElement = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElement);
    
    const selfDestroy = () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }

    instance.selfDestroy = selfDestroy;

  }


}
