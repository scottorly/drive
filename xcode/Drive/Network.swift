//  Copyright © 2020 Scott Orlyck. All rights reserved.

import Foundation
import Combine

enum LoginResponse {
    case success
    case failure
    case validating
}

class Network {

    static let shared = Network()

    let session = URLSession(configuration: .default)

    let url = URL(string: "http://localhost/login")!

    func login(email: String, password: String) -> AnyPublisher<Bool, URLError> {
        let request = URLRequest(url: url)
        return session.dataTaskPublisher(for: request).map { _ in
            true
        }
        .eraseToAnyPublisher()
    }
}

