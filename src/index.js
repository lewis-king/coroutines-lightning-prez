import React from 'react';
import ReactDOM from 'react-dom';

import {
  FlexBox,
  Heading,
  SpectacleLogo,
  UnorderedList,
  CodeSpan,
  OrderedList,
  ListItem,
  FullScreen,
  Progress,
  Appear,
  Stepper,
  Slide,
  Deck,
  Text,
  Grid,
  Box,
  Image,
  CodePane,
  MarkdownSlide,
  MarkdownSlideSet,
  Notes,
  Link
} from 'spectacle';

const formidableLogo =
  'https://avatars2.githubusercontent.com/u/5078602?s=280&v=4';

// Import images
const images = {
  kotlin_logo: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Kotlin_Icon.svg',
  coroutines_visual: 'https://miro.medium.com/max/700/1*OEX52nKgM1SHGO4l1mvV1A.gif',
  stackoverflow_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/512px-Stack_Overflow_icon.svg.png?20190716190036',
  journey_horizon: 'https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  battered_and_bruised: 'https://media.tenor.com/noxQqJwebksAAAAC/quagmire-brian-griffin.gif',
  not_going_anywhere: 'https://media1.giphy.com/media/jR5btQ9LH000ZehIE6/giphy.gif?cid=790b7611efb691e0b1a1b5a7996780ed2a520ef53ac647cf&rid=giphy.gif&ct=g',
  callback_hell: 'https://miro.medium.com/max/640/0*MDSFS8Zy2WRlSlJ2.gif',
  just_the_beginning: 'https://media4.giphy.com/media/qwZobnZVXwh5yrahIN/giphy.gif?cid=790b76110baaee3066e609a3704f34259133641039bd6ef7&rid=giphy.gif&ct=g'
};

// SPECTACLE_CLI_THEME_START
const theme = {
  fonts: {
    header: '"Palatino", Helvetica, Arial, sans-serif',
    text: '"Palatino", Helvetica, Arial, sans-serif'
  }
};
// SPECTACLE_CLI_THEME_END

// SPECTACLE_CLI_TEMPLATE_START
const template = () => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Box padding="0 1em">
      <FullScreen />
    </Box>
    <Box padding="1em">
      <Progress />
    </Box>
  </FlexBox>
);
// SPECTACLE_CLI_TEMPLATE_END

const SlideFragments = () => (
  <>
    <Slide>
      <Text>This is a slide fragment.</Text>
    </Slide>
    <Slide>
      <Text>This is also a slide fragment.</Text>
      <Appear>
        <Text>This item shows up!</Text>
      </Appear>
      <Appear>
        <Text>This item also shows up!</Text>
      </Appear>
    </Slide>
  </>
);

const Presentation = () => (
  <Deck theme={theme} template={template}>
    <Slide>
      <FlexBox paddingTop={0} key={`formidable-logo`} flex={1}>
              <Image src={images.kotlin_logo} width={100} />
              <Text fontSize={70}>Coroutines</Text>
      </FlexBox>
      <Text fontSize="30px" textAlign="center"><span role="img" aria-label="wave">👋</span> Lewis King</Text>
    </Slide>
    <Slide>
    <FlexBox height="100%" flexDirection="row">
      <Image src={images.kotlin_logo} width={100} />
        <Heading margin="0px" fontSize="h1">
          What is Kotlin?
        </Heading>
      </FlexBox>
      <UnorderedList fontSize={"30px"}>
          <ListItem>Cross-platform language developed by JetBrains (1.0 released in 2016)</ListItem>
          <ListItem>Google announced it's the preferred language for Android development (70% of top 1000 apps on Play Store written in Kotlin. incl. Maps & Drive from Google)</ListItem>
          <ListItem>Gaining traction in server-side development</ListItem>
      </UnorderedList>
      <Appear priority={0}>
      <FlexBox paddingTop={0} flex={1}>
              <Image src={images.stackoverflow_logo} width={100} />
              <Text>Love vs Loathed</Text>
      </FlexBox>
      </Appear>
      <FlexBox paddingTop={0} flex={1}>
        <OrderedList fontSize={"30px"}>
        <Appear priority={3}>
          <ListItem>Kotlin - 63 vs 37 (%)</ListItem>
        </Appear>
        <Appear priority={2}>
          <ListItem>Scala - 50 vs 50 (%)</ListItem>
        </Appear>  
        <Appear priority={1}>
          <ListItem>Java - 46 vs 54 (%)</ListItem>
        </Appear>
      </OrderedList>
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="h1">
          The Journey to elegant asynchrony
        </Heading>
              <Image src={images.journey_horizon} width={750} />
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="h1">
          Well.. maybe more like
        </Heading>
              <Image src={images.battered_and_bruised} width={400} />
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="h1">
          Thread-per-request model
        </Heading>
        <Text fontSize={"25px"}>Handles each request in a separate thread. Code flow is sequential and longer running functions are returned after blocking the thread</Text>
        <CodePane language="kotlin" highlightRanges={[[2], [3], [4]]}>{`
        fun persistOdds(feedProvider: FeedProvider) {
            val token = requestToken(feedProvider)
            val odds = retrieveOdds(token, feedProvider)
            processOdds(odds)
        }
      `}</CodePane>
      <UnorderedList fontSize={"25px"}>
          <ListItem>This model falls apart when you attempt to scale to lots of concurrent requests (Threads are expensive and blocking them wastes vital resources)</ListItem>
      </UnorderedList>
      </FlexBox>
     
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="h1">
          Callbacks
        </Heading>
        <Text fontSize={"25px"}>Asynchronous functions that do not return a value but have a callback parameter function. This callback is invoked with the result when it's ready</Text>
        <CodePane language="kotlin" highlightRanges={[[2,3], [3,5], [5,7]]}>{`
        fun persistOdds(feedProvider: FeedProvider) {
            requestTokenAsync(feedProvider) { token -> 
                retrieveOddsAsync(token, feedProvider) { odds ->
                    processOdds(odds)
                }
            }
        }
      `}</CodePane>
      <UnorderedList fontSize={"25px"}>
          <ListItem>Not pretty - Hard to read/follow, maintain, difficult to debug and adding failure/exception handling is a mess</ListItem>
      </UnorderedList>
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="h1">
          Callback Hell
        </Heading>
              <Image src={images.callback_hell} width={700} />
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="h1">
          Futures/Promises/Reactive
        </Heading>
        <Text fontSize={"25px"}>Function returns immediately but the result is wrapped inside an object which at a later point in time will be fulfilled</Text>
        <CodePane language="kotlin">{`
        fun persistOdds(feedProvider: FeedProvider) {
            requestTokenAsync(feedProvider)
                .thenCompose { token -> retrieveOddsAsync(token, feedProvider) }
                .thenAccept { odds -> processOdds(odds) }
            }
        }
      `}</CodePane>
      <UnorderedList fontSize={"25px"}>
          <ListItem>Much nicer code</ListItem>
          <ListItem>Propagates exceptions</ListItem>
          <ListItem>Composable</ListItem>
          <ListItem><b>But,</b> have to learn lots of combinators. This one is for Java CompleteableFuture but there's tonnes of Future / Promise / Reactive libraries out there all demanding their own in-depth API knowledge. It's like learning a new langugae each time I want to build some asychronous code</ListItem>
      </UnorderedList>
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="h1">
          Coroutines
        </Heading>
        <Text fontSize={"25px"}>Allows you to write asychronous code in a natural way. Conceptionally a lightweight thread.</Text>
        <CodePane language="kotlin" highlightRanges={[[2], [3], [4]]}>{`
        suspend fun persistOdds(feedProvider: FeedProvider) {
            val token = requestToken(feedProvider)
            val odds = retrieveOdds(token, feedProvider)
            processOdds(odds)
        }
      `}</CodePane>
      <UnorderedList fontSize={"25px"}>
          <ListItem>This isn't new! (concept of coroutines have been around since (late 50s) but only more recently been used practically)</ListItem>
          <ListItem>Writing code just like we are used to</ListItem>
          <ListItem>That means you can use standard language features; regular loops, collection helpers, exception handling etc</ListItem>
          <ListItem>Because of the suspending rather than blocking nature it scales to handle more asynchronous activities at the same time</ListItem>
      </UnorderedList>
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox paddingTop={150} key={`formidable-logo`} flexDirection={1}>
              <Image src={images.coroutines_visual} width={1000} />
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox paddingTop={0} flexDirection={1}>
      <Heading margin="0px" fontSize="40px">
          <i>Lightweight threads you say 🧐</i>
        </Heading>
      </FlexBox>
      <CodePane language="kotlin" highlightRanges={[[1], [2], [3], [4]]}>{`
        suspend fun runCoroutines() = withContext(Dispatchers.IO) {
          repeat(100_000) { // launch a lot of coroutines
              launch {
                  println("\${suspendingIO()} from: \${Thread.currentThread().name}")
              }
          }
      }
      `}</CodePane>
      <Appear>
      <CodePane language="kotlin" showLineNumbers={false}>{`
        Hi from: DefaultDispatcher-worker-85 @coroutine#99994
        Hi from: DefaultDispatcher-worker-31 @coroutine#99996
        Hi from: DefaultDispatcher-worker-34 @coroutine#99631
        Hi from: DefaultDispatcher-worker-34 @coroutine#99999
        Hi from: DefaultDispatcher-worker-34 @coroutine#100000
        Hi from: DefaultDispatcher-worker-73 @coroutine#99628
        Hi from: DefaultDispatcher-worker-22 @coroutine#99624

        Created all coroutines in 1677ms.
      `}</CodePane>
      </Appear>
    </Slide>
    <Slide>
      <FlexBox paddingTop={0} flexDirection={1}>
      <Heading margin="0px" fontSize="40px">
          Plain-old Threads
        </Heading>
      </FlexBox>
      <CodePane language="kotlin" highlightRanges={[[1], [3], [4]]}>{`
        fun runThreads() {
          repeat(100_000) {
              thread { // create a lot of threads
                  println("\${blockingIO()} from: \${Thread.currentThread().name}")
              }
          }
        }
      `}</CodePane>
      <Appear>
      <CodePane language="kotlin" showLineNumbers={false}>{`
          Hi from: Thread-99996
          Hi from: Thread-99986
          Hi from: Thread-99995
          Hi from: Thread-99998
          Hi from: Thread-99987
          Hi from: Thread-99999
          Hi from: Thread-99991

        Created all threads in 12279ms.
      `}</CodePane>
      </Appear>
    </Slide>
    <Slide>
      <FlexBox paddingTop={0} flexDirection={1}>
      <Heading margin="0px" fontSize="40px">
          Plain-old Threads ☠️
        </Heading>
      </FlexBox>
      <CodePane language="kotlin" highlightRanges={[4]}>{`
        fun runThreads() {
          repeat(100_000) {
              thread {
                  println("\${degradedBlockingIO()} from: \${Thread.currentThread().name}")
              }
          }
        }
      `}</CodePane>
      <Appear>
      <CodePane language="kotlin" showLineNumbers={false}>{`
        Hi from: Thread-4054

        Exception in thread "main" java.lang.OutOfMemoryError: unable to create native thread: possibly out of memory or process/resource limits reached
        at java.base/java.lang.Thread.start0(Native Method)
        at java.base/java.lang.Thread.start(Thread.java:802)
        at kotlin.concurrent.ThreadsKt.thread(Thread.kt:42)
        at kotlin.concurrent.ThreadsKt.thread$default(Thread.kt:20)
      `}</CodePane>
      </Appear>
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="h1">
          Async/Await
        </Heading>
        <Text fontSize={"25px"}>Available in languages like JavaScript, C#, Dart, Python. But Kotlin flips the thinking to this where sequential rather than concurrent is the default behaviour</Text>
        <CodePane language="kotlin" highlightRanges={[[2,3], [4]]}>{`
        suspend fun retrieveMultipleOdds(matchOdds: String, correctScoreOdds: String) : Odds {
          val matchOddsDeferred = async { retrieveOdds(matchOdds) }
          val correctScoreOddsDeferred = async { retrieveOdds(correctScoreOdds) }
          return mergeOdds(matchOddsDeferred.await(), correctScoreOdds.await())
      }
      `}</CodePane>
        <UnorderedList fontSize={"25px"}>
          <ListItem>Concurrency is still generally hard. Make a conscious decision to do things concurrently. Kotlin will provide tools to ease this, but it's still harder than sequential behaviour</ListItem>
          <ListItem>It's an opt-in approach that gives the caller the ability to make the decision whether to call a suspending functions concurrently or sequentially</ListItem>
      </UnorderedList>
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="h1">
          So why choose Coroutines?
        </Heading>
        <UnorderedList fontSize={"25px"}>
          <ListItem><b>Cognitive Load</b> - Nicer, shorter, easier to read code with reduction of boilerplate and focus on business logic</ListItem>
          <ListItem><b>It's Kotlin</b> - Works seamlessly with other language features to leverage idiomatic Kotlin</ListItem>
          <ListItem><b>Migration</b> - Easy to migrate to from a traditional approach</ListItem>
          <ListItem><b>Integration</b> - A lot of frameworks with native support (Spring) and if not, there's interop with other Reactive libraries to bridge</ListItem>
          <ListItem><b>It's efficient</b> - Actually utilises callbacks under the hood knowns as continuations, but that's for another time</ListItem>
      </UnorderedList>
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="h1">
          Wait.. there's more!
        </Heading>
        <Image src={images.just_the_beginning} width={300} />
        <UnorderedList fontSize={"22px"}>
          <ListItem><b>Coroutine Builders</b> - Used to bridge the gap between the normal and suspending world (launch, async, runBlocking)</ListItem>
          <ListItem><b>Coroutine Context and Dispatchers</b> - The context the coroutine executes in and the underlying threads used for execution</ListItem>
          <ListItem><b>Structured concurrency and enforcement</b> - cancellation, exception handling, parent-child jobs, no leaks (Coroutine Scopes)</ListItem>
          <ListItem><b>Flow</b> - Kotlin's reactive streams - ability to return multiple asynchronously computed values</ListItem>
          <ListItem><b>Channels</b> - Provides communication between coroutines in a non-blocking fashion - popularised in Goroutines in Golang</ListItem>
          <ListItem>May seem a lot, but majority of the time heavy-lifting can be delegated to frameworks i.e Spring, Ktor</ListItem>
      </UnorderedList>
      </FlexBox>
    </Slide>
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="150px">
          ✨<i>Thank You</i> ✨
        </Heading>
        <Heading margin="0px 32px" color="primary" fontSize="h3">
          Questions?
        </Heading>
        <Link>https://kotlinlang.org/docs/coroutines-overview.html</Link>
      </FlexBox>
    </Slide>
  </Deck>
);

ReactDOM.render(<Presentation />, document.getElementById('root'));
