import{h as e,P as g,f as m}from"./vendor.16792e99.js";const f=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))h(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&h(u)}).observe(document,{childList:!0,subtree:!0});function c(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function h(i){if(i.ep)return;i.ep=!0;const r=c(i);fetch(i.href,r)}};f();const v="token",w="comment",b="prolog",y="doctype",I="cdata",x="punctuation",D="namespace",k="tag",E="operator",R="number",V="property",M="selector",S="boolean",T="string",N="entity",C="url",L="style",q="keyword",O="control",A="directive",U="unit",F="statement",P="regex",j="atrule",B="placeholder",H="variable",J="deleted",K="inserted",X="italic",W="important",Y="bold",$="highlight",z="constant",G="symbol",_="builtin",Z="char",Q="small",ee="code";var d={"line-highlight":"line-highlight","line-numbers":"line-numbers","linkable-line-numbers":"linkable-line-numbers","line-numbers-rows":"line-numbers-rows",token:v,comment:w,prolog:b,doctype:y,cdata:I,punctuation:x,namespace:D,tag:k,operator:E,number:R,property:V,function:"function","tag-id":"tag-id",selector:M,"atrule-id":"atrule-id","language-javascript":"language-javascript","attr-name":"attr-name","language-css":"language-css","language-scss":"language-scss",boolean:S,string:T,entity:N,url:C,style:L,"attr-value":"attr-value",keyword:q,control:O,directive:A,unit:U,statement:F,regex:P,atrule:j,placeholder:B,variable:H,deleted:J,inserted:K,italic:X,important:W,bold:Y,highlight:$,constant:z,symbol:G,builtin:_,char:Z,"class-name":"class-name",small:Q,code:ee};const te=`let results = query.rx.text
    .throttle(.milliseconds(300), scheduler: MainScheduler.instance)
    .flatMapLatest { query in
        fetchAutoCompleteItems(query)
            .observeOn(MainScheduler.instance)  // results are returned on MainScheduler
            .catchErrorJustReturn([])           // in the worst case, errors are handled
    }
    .share(replay: 1)                           // HTTP requests are shared and results replayed
                                                // to all UI elements

results
    .map { "\\($0.count)" }
    .bind(to: resultCount.rx.text)
    .disposed(by: disposeBag)`,ie=`let safeSequence = xs
    .observeOn(MainScheduler.instance)        // observe events on main scheduler
    .catchErrorJustReturn(onErrorJustReturn)  // can't error out
    .share(replay: 1, scope: .whileConnected) // side effects sharing

return Driver(raw: safeSequence)            // wrap it up

let results = query.rx.text.asDriver()      // This converts a normal sequence into a 'Driver' sequence.
    .throttle(.milliseconds(300), scheduler: MainScheduler.instance)
    .flatMapLatest { query in
        fetchAutoCompleteItems(query)
            .asDriver(onErrorJustReturn: [])  // Builder just needs info about what to return in case of error.
    }

results
    .map { "($0.count)" }
    .drive(resultCount.rx.text)            // If there is a 'drive' method available instead of 'bind(to:)',
    .disposed(by: disposeBag)              // that means that the compiler has proven that all properties
                                           // are satisfied.`,re=`import Foundation
import RxSwift
import RxCocoa

class ViewModel {
  
    //MARK: - Inputs
  
    init(
        email: Driver<String>,
        password: Driver<String>,
        signIn: Driver<Void>
    ) {
    
    }
}`,ne=`import UIKit
import RxSwift
import RxCocoa

class ViewController: UIViewController {

    // MARK: - IBOutlets

    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    @IBOutlet weak var signIn: UIButton!
    
    lazy var viewModel: ViewModel = {
        ViewModel(email: email.rx.text.orEmpty.asDriver(),
                  password: password.rx.text.orEmpty.asDriver(),
                  signIn: signIn.rx.tap.asDriver())
    }()
    
}`,se=`class ViewModel {
  
    //MARK: - Outputs

    let validatedEmail: Driver<Validation>
    let validatedPassword: Driver<Validation>
  
    //MARK: - Inputs
  
    init(
          email: Driver<String>,
          password: Driver<String>,
          signIn: Driver<Void>
      ) {
          let validation = ValidationService.shared
      
          validatedEmail = Driver.combineLatest(email, signIn).flatMapLatest {
              validation.validate(email: $0.0)
                  .asDriver(onErrorJustReturn: .failed("Email required."))
          }

          validatedPassword = Driver.combineLatest(password, signIn).flatMapLatest {
              validation.validate(password: $0.0)
                  .asDriver(onErrorJustReturn: .failed("Password required."))
          }
      }
}`,oe=`class ViewController: UIViewController { ...
                             
    let bag = DisposeBag()
                                        
    func bind() {
        viewModel.validatedEmail.drive(onNext: { [weak self] result in
           if case .failed(let message) = result {
                self?.emailError.text = message
                self?.emailError.isHidden = false
            } else {
                self?.emailError.isHidden = true
            }
            UIView.animate(withDuration: 0.2) {
                self?.view.layoutIfNeeded()
            }
        }).disposed(by: bag)

        viewModel.validatedPassword.drive(onNext: { [weak self] result in
            if case .failed(let message) = result {
                self?.emailError.text = message
                self?.emailError.isHidden = false
            } else {
                self?.emailError.isHidden = true
            }
            UIView.animate(withDuration: 0.2) {
                self?.view.layoutIfNeeded()
            }
        }).disposed(by: bag)
    }
}`,ae=`let signingIn: Driver<Bool>
let signedIn: Driver<LoginResponse>`,le=`let emailPassword = Driver.combineLatest(email, password)

let activity = ActivityIndicator()
signingIn = activity.asDriver()

let validated = Driver.combineLatest(
    emailPassword,
    validatedEmail,
    validatedPassword,
    signingIn
)`,de=`signedIn = signIn.withLatestFrom(validated).flatMapLatest { combined in
    let (emailPassword, validatedUsername, validatedPassword, signingIn) = combined
    guard case (.success, .success, false) = (validatedUsername, validatedPassword, signingIn) else {
        return .just(.validating)
    }
    return Network.shared.login(email: emailPassword.0,
                                password: emailPassword.1)
        .flatMap { response -> Observable<LoginResponse> in
            if case .success = response {
                return .just(.success)
            }
            return .just(response)
    }
    .trackActivity(activity)
    .asDriver(onErrorJustReturn: .failure)
}`,ce=`viewModel.signingIn.drive(onNext: { [weak self] signingIn in
    self?.signIn.isEnabled = !signingIn
}).disposed(by: bag)

viewModel.signedIn.drive(onNext: { [weak self] signedIn in
    if case .success = signedIn {
        self?.emailError.isHidden = true
        self?.passwordError.isHidden = true
        self?.view.endEditing(true)
    }
    if case .failure = signedIn {
        let message = "Failed, please try again."
        self?.passwordError.text = message
        self?.passwordError.isHidden = false
        self?.emailError.isHidden = true
    }
    UIView.animate(withDuration: 0.2) {
        self?.view.layoutIfNeeded()
    }
}).disposed(by: bag)`,ue=`import XCTest
import RxSwift
import RxCocoa

@testable import Drive

class TestDrive: XCTestCase {

    var subject: ViewModel?
    let bag = DisposeBag()
    override func setUpWithError() throws {
        
        let email: Driver<String> = Observable<String>.just("email@email").asDriver(onErrorJustReturn: "")

        let password: Observable<String> = .just("email@email")
        let signIn: Observable<Void> = .just(())

        subject = ViewModel(
            email: email.asDriver(onErrorJustReturn: ""),
            password: password.asDriver(onErrorJustReturn: ""),
            signIn: signIn.asDriver(onErrorJustReturn:())
        )
    }

    func testDrive() throws {
        XCTAssertNotNil(subject)
        subject?.validatedEmail.drive(onNext: { result in
            XCTAssertEqual(result, .failed("Please enter a valid email address."))
        }).disposed(by: bag)
    }

}`;var n={example:te,rxDriver:ie,init:re,init0:ne,validation:se,signIn:de,bindSignIn:ce,outputs:ae,compose:le,bindValidation:oe,testDrive:ue};const t=({attributes:{code:o}})=>e("span",{className:d.inlineCode},e("code",{className:"language-swift"},o)),s=({children:o,attributes:{snippet:a,dataline:c}})=>e(m,null,e("p",null,o),e("figure",{className:d.small},e("pre",{"data-line":c},e("code",{className:`${d.code} language-swift`},a)))),l=({children:o,attributes:{href:a}})=>e("a",{target:"_blank",rel:"noreferrer noopener",href:a},o);let p=0;const pe=({children:o})=>(p++,e(m,null,e("label",{for:p,className:"margin-toggle"},"\u2295"),e("input",{type:"checkbox",id:p,className:"margin-toggle"}),e("span",{className:"marginnote"},o))),he=e("article",null,e("section",null,e("h1",null,"DRIVE"),e("p",{className:"subtitle"},"Functional Reactive Form Validation in iOS with RxSwift"),e("p",{className:"subtitle"},e(l,{href:"https://scottorly.github.io"},"Scott Orlyck"))),e("section",null,e("figure",null,e("img",{src:"https://raw.githubusercontent.com/scottorly/drive/main/src/drive.webp",alt:"Ryan Gosling with a Dispose Bag"}),e("a",{href:"https://www.youtube.com/watch?v=KBiOF3y1W0Y"},e("em",null,"Drive")))),e("section",null,e("h2",null,"WHY DRIVE?"),e("p",null,e("span",{className:"newthought"},"SwiftUI has been getting all")," the love since it was announced but I want to take some time to write about the productivity benefits of functional reactive programming using RxSwift when combined with the stability of UIKit."),e("p",null,"Observables are an excellent data-binding mechanism when escaping target-action, delegate based MVC patterns but even after the steep learning curve remembering tedious boilerplate and dodging footguns can be time consuming and error prone. Furthermore type inference across API boundaries can result in frustrating fights with the Swift compiler."),e("p",null,"An example from the RxSwift documentation is an effective demonstration of the implementation complexity faced when using Rx with UIKit properly."),e(s,{snippet:n.example}),e("p",null,"Thankfully RxSwift provides us with some wrappers around common UI patterns that can help simplify implementations. RxSwift calls these wrappers ",e(l,{hre:"https://github.com/ReactiveX/RxSwift/blob/main/Documentation/Traits.md"},"traits")," and today we are going to focus on the ",e("a",{href:"https://github.com/ReactiveX/RxSwift/blob/main/Documentation/Traits.md#driver"},"Driver")," trait."),e("p",null,"RxSwift Traits are simple structs that implement the builder pattern to return an observable sequence guaranteed to have certain properties. The Driver trait guarantees three properties that happen to be integral to correct UI implementations: events are observed on the main thread, the observable sequence can't error out, and side effects are shared so that each subscription will share the same computational resources."),e(s,{snippet:n.rxDriver})),e("section",null,e("h2",null,"UITEXTFIELD VALIDATION"),e("p",null,e(pe,null,e("img",{src:"https://raw.githubusercontent.com/scottorly/drive/main/src/validation.gif",alt:"animated gif of text field validation"})),"Form validation that provides the user with immediate feedback if a text field meets predefined requirements is a common UX pattern and this example will show you how you can use the Driver trait for effective results with a very small amount of clean, testable code."),e("h2",null,"BRAKING ZONE"),e("p",null,"For the purpose of narrowing the focus of this article I won't be going over project setup, how to connect outlets in storyboards, the basics of RxSwift/RxCocoa etc. I will also be handwaving the networking, validation and network activity tracking utilities as those implementation details are outside the scope of this article. The working project source code is available ",e("a",{href:"https://github.com/ScottORLY/drive"},"here")," if you would like to take a closer look or test a working example on a simulator or device."),e("p",null,"This project will use MVVM but there are a few ground rules to help enforce seperation of concerns:",e("ol",{type:"1",className:d.list},e("li",null,"The ViewModel can never import UIKit or reference the ViewController."),e("li",null,"The ViewModel will never subscribe to an observable."),e("li",null,"The ViewController will never directly call any methods defined on the ViewModel."))),e("p",null,"First we define inputs to the ViewModel. The initializer for our new ViewModel class below takes a pair of ",e(t,{code:"Driver<String>"})," for the email and password and a ",e(t,{code:"Driver<Void>"})," for the sign in button tap. We are not going to explicitly store references to these sequences."),e(s,{snippet:n.init}),e("p",null,"In the ViewController we initialize the ViewModel passing in the Observables from the IBOutlets. Note the call to ",e(t,{code:".asDriver()"})," to build the Drivers from the ControlEvent observables."),e(s,{snippet:n.init0}),e("p",null,"Next we define output properties to store the reference to the result of the operator transformations we are going to perform on the input observables."),e(s,{snippet:n.validation}),e("p",null,"Above we are using ",e("a",{href:"http://reactivex.io/documentation/operators/combinelatest.html"},e(t,{code:"Driver.combineLatest"}))," to combine events from the UITextField Drivers and the sign in button tap. The purpose of this is to exploit a behavior of combine latest that the result observable will not emit an event until both source observables have at least one in order to prevent displaying validation errors before user interaction. Then we ",e(t,{code:".flatMapLatest"})," the combined text and tap events passing the string into our validation service's appropriate validation method and return a ",e(t,{code:"Driver<Validation>"})," that is stored in the output properties defined above."),e("p",null,"Close the loop by calling ",e(t,{code:"drive(onNext:)"})," on the output observables in the ViewController. Don't forget to put the results of the ",e(t,{code:"drive(onNext:)"})," calls in the ",e(t,{code:"bag"})," or to call ",e(t,{code:"bind()"})," in ",e(t,{code:"viewDidLoad()"}),"."),e(s,{snippet:n.bindValidation}),e("h2",null,"THE GETAWAY"),e("p",null,"Add two more output properties to the ViewModel. The first is ",e(t,{code:"signingIn: Driver<Bool>"})," to manage the state of the current request so we can disable the sign in button when a request is in-flight. The second is the output Driver for the response from the network request to sign in."),e(s,{snippet:n.outputs}),e("p",null,"The ViewModel snippet below is preparation to handle the sign in implementation. Compose the email and password text drivers (the inputs) with the validation result drivers (the outputs) in addition we create another Driver wrapped observable from a utility class borrowed from RxExample that provides the ability to track the activity of an observable so we can prevent the user from creating a duplicate request if one is already in-flight and the user mashes the sign in button."),e(s,{snippet:n.compose}),e("p",null,"Finally we hook everything together, there is a lot going on here so let's break it down line by line. First call ",e(t,{code:"withLatestFrom()"})," on the ",e(t,{code:"signIn: Driver<Void>"})," passing in the combined inputs and outputs composed above (",e(t,{code:"validated"}),"). Then ",e(t,{code:"flatMapLatest"})," the sign in button tap event with the observables composition, guard for successful validation and no requests in flight, then ",e(t,{code:"flatMap"})," the observable from the network sign in request, check the response status (the example code is oversimplified but in a real world application here is where you determine error messsages to display if for instance the response was ",e("i",null,"401 unauthorized"),") and return an ",e(t,{code:"Observable<LoginResponse>"}),", add the activity tracking and finally build the ",e(t,{code:"signedIn: Driver<LoginResponse>"})," output Driver."),e(s,{snippet:n.signIn}),e("p",null,"Now in the ViewController we use ",e(t,{code:"drive(onNext:)"})," to drive the state of the ",e(t,{code:"isEnabled"})," property of the sign in button and drive ",e(t,{code:"signedIn"})," to handle the result of the sign in network call. Again taking caution to use ",e(t,{code:"[weak self]"})," and don't forget to dispose of the result of ",e(t,{code:"drive"})," in the bag."),e(s,{snippet:n.bindSignIn}),e("p",null,"The success state is where the application would presumably handle navigating elsewhere or dismissing the sign in screen if presented modally. In a real world application the response should wrap a more informative error message that can then be displayed to the user."),e("h2",null,"TEST DRIVE"),e("p",null,"What about unit testing the ViewModel you ask? Simple, since all the ViewModel knows is that it needs 3 Drivers we can provide those easily."),e(s,{snippet:n.testDrive}),e("h2",null,"IN THE BAG"),e("p",null,"That's the post, you can find the completed working project ",e("a",{href:"https://github.com/ScottORLY/drive"},"here"),". Feel free to drop some feedback or questions on ",e(l,{href:"https://twitter.com/orlyck"},"Twitter")," or you can go to the ",e(l,{href:"https://github.com/Scottorly/drive"},"source")," of this blog post itself and create an issue or pull-request. Until next time.")));document.body.appendChild(he);g.highlightAll();
