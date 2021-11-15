//Copyright © 2021 Scott Orlyck. All rights reserved.

import UIKit
import Combine

typealias KVOPublisher = NSObject.KeyValueObservingPublisher<UITextField, String?>

class ViewController: UIViewController {

    lazy var viewModel: ViewModel = {
        ViewModel(email: email.publisher(for: .editingChanged),
                  password: password.publisher(for: .editingChanged),
                  signIn: signIn.publisher(for: .touchUpInside)
        )
    }()

    var bag = Set<AnyCancellable>()

    // MARK: - IBOutlets

    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    @IBOutlet weak var signIn: UIButton!

    @IBOutlet weak var emailError: UILabel!
    @IBOutlet weak var passwordError: UILabel!

    @IBOutlet var tap: UITapGestureRecognizer!
    @IBOutlet weak var scroll: UIScrollView!

    // MARK: - UIViewController

    override func viewDidLoad() {
        super.viewDidLoad()
        bind()
        bindKeyboardNotifications()
    }

    func bind() {
        viewModel.validatedEmail.sink { [weak self] result in
            if case .failed(let message) = result {
                self?.emailError.text = message
                self?.emailError.isHidden = false
            } else {
                self?.emailError.isHidden = true
            }
            UIView.animate(withDuration: 0.2) {
                self?.view.layoutIfNeeded()
            }
        }.store(in: &bag)

        viewModel.validatedPassword.sink { [weak self] result in
            if case .failed(let message) = result {
                self?.passwordError.isHidden = false
                self?.passwordError.text = message
            } else {
                self?.passwordError.isHidden = true
            }
            UIView.animate(withDuration: 0.2) {
                self?.view.layoutIfNeeded()
            }
        }.store(in: &bag)

        viewModel.signedIn
            .receive(on: DispatchQueue.main)
            .sink { [weak self] signedIn in
                if signedIn {

                    self?.emailError.isHidden = true
                    self?.passwordError.isHidden = true
                    self?.view.endEditing(true)
                } else {
                    let message = "Failed, please try again."
                    self?.passwordError.text = message
                    self?.passwordError.isHidden = false
                    self?.emailError.isHidden = true
                }
                UIView.animate(withDuration: 0.2) {
                    self?.view.layoutIfNeeded()
                }
            }.store(in: &bag)

        tap.publisher().sink { [weak self] _ in
            self?.view.endEditing(true)
        }.store(in: &bag)
    }

    func bindKeyboardNotifications() {
        NotificationCenter.default
            .publisher(for: UIResponder.keyboardWillShowNotification)
            .sink { [weak self] notification in
                let frame = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect ?? .zero
                let contentInset = UIEdgeInsets(top: 0.0, left: 0.0, bottom: frame.height, right: 0.0)
                self?.scroll.contentInset = contentInset
            }.store(in: &bag)

        NotificationCenter.default
            .publisher(for: UIResponder.keyboardWillHideNotification)
            .sink { [weak self] notification in
                self?.scroll.contentInset = .zero
            }.store(in: &bag)
    }

    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }
}

extension ViewController: UIScrollViewDelegate {
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let translation = scrollView.panGestureRecognizer.translation(in: self.view)
        if translation.y > 0 {
            view.endEditing(true)
        }
    }
}
