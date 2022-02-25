import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef
  } from '@angular/core';

import { VerbatinContainerComponent } from '../components/verbatin-container/verbatin-container.component';

@Injectable({
  providedIn: 'root'
})
export class DomServiceService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  containerReference: any;

  createReference () {
    if (!this.containerReference) {
      this.containerReference = this.componentFactoryResolver
        .resolveComponentFactory(VerbatinContainerComponent)
        .create(this.injector);
  
      this.appRef.attachView(this.containerReference.hostView);
  
      const domElement = (this.containerReference.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
  
      document.body.appendChild(domElement);
    }
  }


  appendComponentToBody (component:any, parameters:any) {
    if (!this.containerReference) {
      this.createReference();
    }

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
    // document.body.appendChild(domElement);
    const containerElement = document.getElementById("verbatinContainer");
    containerElement?.appendChild(domElement);
    
    const selfDestroy = () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }
    instance.selfDestroy = selfDestroy;

    return instance;
  }


}
