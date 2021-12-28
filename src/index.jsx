import './tufte.module.css'
import styles from './styles.module.css'
import Prism from 'prismjs'
import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/components/prism-swift'
import Snippets from './snippets'

const InlineCode = ({ attributes: { code }}) => (
    <span className={styles.inlineCode}>
        <code className='language-swift'>{code}</code>
    </span>
)

const date = new Date()

const Code = ({ children, attributes: { snippet, dataline }}) => (
    <>
        <p>
            {children}
        </p>
        <figure className={styles.small}>
                <pre data-line={dataline} >
                    <code className={`${styles.code} language-swift`}>
                        { snippet }
                    </code>
                </pre>
        </figure>
    </>
)

const Link = ({ children, attributes: { href }}) => (
    <a target="_blank" rel="noreferrer noopener" href={href}>
        {children}
        </a>
)

let marginNoteId = 0
let sideNoteId = 0

const MarginNote = ({ children }) => {
    marginNoteId++
    return (<>
        <label for={marginNoteId} className="margin-toggle">&#8853;</label>
        <input type="checkbox" id={marginNoteId} className="margin-toggle"/>
        <span className="marginnote">
            { children }
        </span>
    </>)
}

const SideNote = ({ children }) => {
    sideNoteId++
    return <>
            <label for={`${sideNoteId}a`} className="margin-toggle sidenote-number"/>
            <input type="checkbox" id={`${sideNoteId}a`} className="margin-toggle"/>
            <span className="sidenote">
                { children }
            </span>
        </>
}

const blog = (
    <article>
        <section>
            <h1>Drive</h1>
            <h2>Functional Reactive Form Validation in iOS with RxSwift</h2>
            <h3>by <a href='https://scottorly.github.io'>Scott Orlyck</a></h3>
            <p>last updated: { date.toLocaleDateString() }</p>
            <figure>
                <img src='https://raw.githubusercontent.com/scottorly/drive/main/src/drive.webp' alt='Ryan Gosling with a Dispose Bag'/>
            </figure>
            <a href='https://www.youtube.com/watch?v=KBiOF3y1W0Y'>
                    <i>Drive</i>
            </a>
        </section>
    
        <section>
            
            <h2>INTRODUCTION</h2>

            <p>
                This blog post is intended for readers with some measure of familiarity with iOS development, 
                functional reactive programming and alternative iOS architecture patterns.

                If not here are some resources to get started.
                <ul className={styles.list}>
                    <li><a href='http://reactivex.io/'>ReactiveX</a></li>

                    <li><a href='https://github.com/ReactiveX/RxSwift'>RxSwift</a></li>
                    
                    <li><a href='https://www.raywenderlich.com/34-design-patterns-by-tutorials-mvvm'>MVVM</a></li>
                </ul>
            </p>

            <h2>WHY DRIVE?</h2>

            <p>
                SwiftUI has been getting all the love since it was announced but I want to take some time to write about the productivity benefits of functional reactive programming using RxSwift when combined with the stability of UIKit.
            </p>

            <p>
                Observables are an excellent data-binding mechanism when escaping target-action, delegate based MVC patterns but even after the steep learning curve remembering tedious boilerplate and dodging footguns can be time consuming and error prone. Furthermore type inference across API boundaries can result in frustrating fights with the Swift compiler.
            </p>

            <p>
                An example from the RxSwift documentation is an effective 
                demonstration of the implementation complexity faced when using Rx with UIKit properly.
            </p>
            
            <Code snippet={Snippets.example} />

            <p>
                Thankfully RxSwift provides us with some wrappers around common UI patterns that can help simplify implementations. RxSwift calls these wrappers <a hre='https://github.com/ReactiveX/RxSwift/blob/main/Documentation/Traits.md'>traits</a> and today we are going to focus on the <a href="https://github.com/ReactiveX/RxSwift/blob/main/Documentation/Traits.md#driver">Driver</a> trait.
            </p>

            <p>
                RxSwift Traits are simple structs that implement the builder pattern to return an observable sequence guaranteed to have certain properties. The Driver trait guarantees three properties that happen to be integral to correct UI implementations: events are observed on the main thread, the observable sequence can't error out, and side effects are shared so that each subscription will share the same computational resources.
            </p>
        <Code snippet={Snippets.rxDriver} />
    </section>
    <section>
        <h2>UITEXTFIELD VALIDATION</h2>
        <p>
            <MarginNote>
            {/* <figure> */}
                <img src='https://raw.githubusercontent.com/scottorly/drive/main/src/validation.gif' alt='animated gif of text field validation' />
            {/* </figure> */}
            </MarginNote>
            Form validation that provides the user with immediate feedback if a text field meets predefined requirements is a common UX pattern and this example will show you how you can use the Driver trait for effective results with a very small amount of clean, testable code.
        </p>
        <h2>BRAKING ZONE</h2>
        <p>
            For the purpose of narrowing the focus of this article I won't be going over project setup, how to connect outlets in storyboards, the basics of RxSwift/RxCocoa etc. I will also be handwaving the networking, validation and network activity tracking utilities as those implementation details are outside the scope of this article. The working project source code is available <a href='https://github.com/ScottORLY/drive'>here</a> if you would like to take a closer look or test a working example on a simulator or device.
        </p>
        <p>
            This project will use MVVM but there are a few ground rules to help enforce seperation of concerns:
            <ol type='1' className={styles.list}>
                <li>The ViewModel can never import UIKit or reference the ViewController.</li>
                <li>The ViewModel will never subscribe to an observable.</li>
                <li>The ViewController will never directly call any methods defined on the ViewModel.</li>
            </ol>
        </p>
        <p>
            First we define inputs to the ViewModel. The initializer for our new ViewModel class below takes a pair of <InlineCode code='Driver<String>' /> for the email and password and a <InlineCode code='Driver<Void>' /> for the sign in button tap. We are not going to explicitly store references to these sequences.
        </p>

        <Code snippet={Snippets.init} />

        <p>
            In the ViewController we initialize the ViewModel passing in the Observables from the IBOutlets. Note the call to <InlineCode code='.asDriver()'/> to build the Drivers from the ControlEvent observables.
        </p>

        <Code snippet={Snippets.init0} />

        <p>
            Next we define output properties to store the reference to the result of the operator transformations we are going to perform on the input observables.
        </p>

        <Code snippet={Snippets.validation} />

        <p>
            Above we are using <a href='http://reactivex.io/documentation/operators/combinelatest.html'><InlineCode code='Driver.combineLatest' /></a> to combine events from the UITextField Drivers and the sign in button tap. The purpose of this is to exploit a behavior of combine latest that the result observable will not emit an event until both source observables have at least one in order to prevent displaying validation errors before user interaction. Then we <InlineCode code='.flatMapLatest' /> the combined text and tap events passing the string into our validation service's appropriate validation method and return a <InlineCode code='Driver<Validation>' /> that is stored in the output properties defined above.
        </p>
        
        <p>
            Close the loop by calling <InlineCode code='drive(onNext:)' /> on the output observables in the ViewController. Don't forget to put the results of the <InlineCode code='drive(onNext:)' /> calls in the <InlineCode code='bag' /> or to call <InlineCode code='bind()'/> in <InlineCode code='viewDidLoad()'/>.
        </p>

        <Code snippet={Snippets.bindValidation} />

        <h2>THE GETAWAY</h2>

        <p>
            Add two more output properties to the ViewModel. The first is <InlineCode code='signingIn: Driver<Bool>' /> to manage the state of the current request so we can disable the sign in button when a request is in-flight. The second is the output Driver for the response from the network request to sign in.
        </p>

        <Code snippet={Snippets.outputs} />

        <p>
            The ViewModel snippet below is preparation to handle the sign in implementation. Compose the email and password text drivers (the inputs) with the validation result drivers (the outputs) in addition we create another Driver wrapped observable from a utility class borrowed from RxExample that provides the ability to track the activity of an observable so we can prevent the user from creating a duplicate request if one is already in-flight and the user mashes the sign in button.
        </p>

        <Code snippet={Snippets.compose} />

        <p>
            Finally we hook everything together, there is a lot going on here so let's break it down line by line. First call <InlineCode code='withLatestFrom()' /> on the <InlineCode code='signIn: Driver<Void>' /> passing in the combined inputs and outputs composed above (<InlineCode code='validated' />). Then <InlineCode code='flatMapLatest' /> the sign in button tap event with the observables composition, guard for successful validation and no requests in flight, then <InlineCode code='flatMap' /> the observable from the network sign in request, check the response status (the example code is oversimplified but in a real world application here is where you determine error messsages to display if for instance the response was <i>401 unauthorized</i>) and return an <InlineCode code='Observable<LoginResponse>' />, add the activity tracking and finally build the <InlineCode code='signedIn: Driver<LoginResponse>' /> output Driver. 
        </p>

        <Code snippet={Snippets.signIn} />

        <p>
            Now in the ViewController we use <InlineCode code='drive(onNext:)' /> to drive the state of the <InlineCode code='isEnabled' /> property of the sign in button and drive <InlineCode code='signedIn'/> to handle the result of the sign in network call. Again taking caution to use <InlineCode code='[weak self]' /> and don't forget to dispose of the result of <InlineCode code='drive' /> in the bag. 
        </p>

        <Code snippet={Snippets.bindSignIn} />

        <p>
            The success state is where the application would presumably handle navigating elsewhere or dismissing the sign in screen if presented modally. In a real world application the response should wrap a more informative error message that can then be displayed to the user.
        </p>

        <h2>Test Drive</h2>

        <p>
            What about unit testing the ViewModel you ask? Simple, since all the ViewModel knows is that it needs 3 Drivers we can provide those easily. 
        </p>

        <Code snippet={Snippets.testDrive} />

        <h2>In the Bag</h2>
        <p>That's the post, you can find the completed working project <a href='https://github.com/ScottORLY/drive'>here</a>. Feel free to drop some feedback or questions on <a href='https://twitter.com/orlyck'>Twitter</a> or you can go to the <a href='https://github.com/ScottORLY/drive-blog'>source</a> of this blog post itself and create an issue or pull-request. Until next time.</p>
        </section>
    </article>
)
document.body.appendChild(blog)


Prism.highlightAll()