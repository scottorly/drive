const example = `let results = query.rx.text
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
    .disposed(by: disposeBag)`

const rxDriver = `let safeSequence = xs
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
    .map { "\($0.count)" }
    .drive(resultCount.rx.text)            // If there is a 'drive' method available instead of 'bind(to:)',
    .disposed(by: disposeBag)              // that means that the compiler has proven that all properties
                                           // are satisfied.`

const init = `import Foundation
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
}`

const init0 = `import UIKit
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
    
}`

const validation = `class ViewModel {
  
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
}`

const bindValidation = `class ViewController: UIViewController { ...
                             
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
}`

const outputs = `let signingIn: Driver<Bool>
let signedIn: Driver<LoginResponse>`

const compose = `let emailPassword = Driver.combineLatest(email, password)

let activity = ActivityIndicator()
signingIn = activity.asDriver()

let validated = Driver.combineLatest(
    emailPassword,
    validatedEmail,
    validatedPassword,
    signingIn
)`

const signIn = `signedIn = signIn.withLatestFrom(validated).flatMapLatest { combined in
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
}`

const bindSignIn = `viewModel.signingIn.drive(onNext: { [weak self] signingIn in
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
}).disposed(by: bag)`

const testDrive = `import XCTest
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

}`

export default { 
    example,
    rxDriver,
    init,
    init0,
    validation,
    signIn,
    bindSignIn,
    outputs,
    compose,
    bindValidation,
    testDrive
}