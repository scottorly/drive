import Combine
import UIKit.UIControl
import UIKit.UIGestureRecognizer

//https://www.avanderlee.com/swift/custom-combine-publisher/

/// A custom subscription to capture UIControl target events.

final class ControlSubscription<SubscriberType: Subscriber, Control: UIControl>: Subscription where SubscriberType.Input == Control {
    private var subscriber: SubscriberType?
    private let control: Control

    init(subscriber: SubscriberType, control: Control, event: UIControl.Event) {
        self.subscriber = subscriber
        self.control = control
        control.addTarget(self, action: #selector(eventHandler), for: event)
    }

    func request(_ demand: Subscribers.Demand) {
        // We do nothing here as we only want to send events when they occur.
        // See, for more info: https://developer.apple.com/documentation/combine/subscribers/demand
    }

    func cancel() {
        subscriber = nil
    }

    @objc private func eventHandler() {
        _ = subscriber?.receive(control)
    }
}

/// A custom `Publisher` to work with our custom `UIControlSubscription`.
struct UIControlPublisher<Control: UIControl>: Publisher {

    typealias Output = Control
    typealias Failure = Never

    let control: Control
    let controlEvents: UIControl.Event

    init(control: Control, events: UIControl.Event) {
        self.control = control
        self.controlEvents = events
    }

    func receive<S>(subscriber: S) where S : Subscriber, S.Failure == UIControlPublisher.Failure, S.Input == UIControlPublisher.Output {
        let subscription = ControlSubscription(subscriber: subscriber, control: control, event: controlEvents)
        subscriber.receive(subscription: subscription)
    }
}

/// Extending the `UIControl` types to be able to produce a `UIControl.Event` publisher.
protocol CombineCompatible { }
extension UIControl: CombineCompatible { }
extension CombineCompatible where Self: UIControl {
    func publisher(for events: UIControl.Event) -> UIControlPublisher<UIControl> {
        return UIControlPublisher(control: self, events: events)
    }
}

// MARK: - UIGestureRecognizer Subscriptions

/// A custom subscription to capture GestureRecognizer target events.
final class GestureSubscription<SubscriberType: Subscriber, Gesture: UIGestureRecognizer>: Subscription where SubscriberType.Input == Gesture {
    private var subscriber: SubscriberType?
    private let gesture: Gesture

    init(subscriber: SubscriberType, gesture: Gesture) {
        self.subscriber = subscriber
        self.gesture = gesture
        gesture.addTarget(self, action: #selector(eventHandler))
    }

    func request(_ demand: Subscribers.Demand) {
        // We do nothing here as we only want to send events when they occur.
        // See, for more info: https://developer.apple.com/documentation/combine/subscribers/demand
    }

    func cancel() {
        subscriber = nil
    }

    @objc private func eventHandler() {
        _ = subscriber?.receive(gesture)
    }
}

// MARK: - UIGestureRecognizer Publisher

/// A custom `Publisher` to work with `GestureSubscription`.
struct GesturePublisher<Gesture: UIGestureRecognizer>: Publisher {

    typealias Output = Gesture
    typealias Failure = Never

    let gesture: Gesture

    init(gesture: Gesture) {
        self.gesture = gesture
    }

    func receive<S>(subscriber: S) where S : Subscriber, S.Failure == GesturePublisher.Failure, S.Input == GesturePublisher.Output {
        let subscription = GestureSubscription(subscriber: subscriber, gesture: gesture)
        subscriber.receive(subscription: subscription)
    }
}

/// Extending `UIGestureRecognizer`

extension UIGestureRecognizer: CombineCompatible { }
extension CombineCompatible where Self: UIGestureRecognizer {
    func publisher() -> GesturePublisher<UIGestureRecognizer> {
        return GesturePublisher(gesture: self)
    }
}
