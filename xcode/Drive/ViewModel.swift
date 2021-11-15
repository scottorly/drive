//Copyright © 2020 Scott Orlyck. All rights reserved.

import UIKit
import Combine

class ViewModel: ObservableObject {

    //MARK: - Outputs

    let validatedEmail: AnyPublisher<Validation, Never>
    let validatedPassword: AnyPublisher<Validation, Never>

    @Published var signingIn: Bool = false
    @Published var signedIn: Bool = false

    //MARK: - Inputs

    init(
        email: UIControlPublisher<UIControl>,
        password: UIControlPublisher<UIControl>,
        signIn: UIControlPublisher<UIControl>
    ) {
        let validation = ValidationService.shared

        validatedEmail = email.flatMap {
            Just(validation.validate(email: ($0 as? UITextField)?.text ?? ""))
        }.eraseToAnyPublisher()

        validatedPassword = password.flatMap {
            Just(validation.validate(password: ($0 as? UITextField)?.text ?? ""))
        }.eraseToAnyPublisher()

        let emailPassword = email.combineLatest(password) {
            (($0 as? UITextField)?.text ?? "", ($1 as? UITextField)?.text ?? "")
        }

        let pub = signIn.combineLatest(emailPassword)
            .setFailureType(to: URLError.self)
            .flatMap {
                Network.shared.login(email: $1.0, password: $1.1)
            }
            .replaceError(with: false)
            .eraseToAnyPublisher()
    }
}


