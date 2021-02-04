import React, {useState} from 'react';

import './Tutorial.css'

const Tutorial = () => {

    const [whatPredictionMarket, setWhatPredictionMarket] = useState(false)
    const [thisMarket, setThisMarket] = useState(false)
    const [marketBehavior, setMarketBehavior] = useState(false)
    const [predictionScore, setPredictionScore] = useState(false)
    const [submitPrediction, setSubmitPrediction] = useState(false)
    const [createEvent, setCreateEvent] = useState(false)
    const [whatResolved, setWhatResolved] = useState(false)
    const [adminUser, setAdminUser] = useState(false)


    const toggleWhatPredictionMarket = () => {
        setWhatPredictionMarket(!whatPredictionMarket)
    }

    const toggleThisMarket = () => {
        setThisMarket(!thisMarket)
    }

    const toggleMarketBehavior = () => {
        setMarketBehavior(!marketBehavior)
    }

    const togglePredictionScore = () => {
        setPredictionScore(!predictionScore)
    }

    const toggleSubmitPrediction = () => {
        setSubmitPrediction(!submitPrediction)
    }

    const toggleCreateEvent = () => {
        setCreateEvent(!createEvent)
    }

    const toggleWhatResolved = () => {
        setWhatResolved(!whatResolved)
    }

    const toggleAdminUser = () => {
        setAdminUser(!adminUser)
    }


    return (
        <div className='Tutorial__container'>
            <p className='Tutorial-head-text'>
                Welcome to FutureScape! The app to answer your questions about the 
                future. On your first visit, you might wonder, how does this all
                work? Well, this page will (hopefully) answer all your questions. 
                We give it a 70/30 chance at least. 
            </p>

            <div className='Tutorial-question' onClick={toggleWhatPredictionMarket}>
                <h3>What is a Prediction Market?</h3>
            </div>
            {whatPredictionMarket ? <div className='Tutorial-answer'>
                <p>
                    Imagine you're a stock broker on Wall Street. The current price of a certain stock is $5, but you think it should actually 
                    be worth $10. So what do you do? You buy as much of that stock you can until its price is $10. By buying on what you thought the 
                    true value of that stock was, you just corrected the market and, if you are correct, just made a lot of money. That is what a prediction market 
                    does. But, instead of stocks, prediction markets trade on what they think the future is going is going to look like. For example, who will be the 
                    presidential candidates for the next election? A market could be set up that has different candidates for each option, and people can trade those 
                    options among themselves.
                </p>
                <p>
                    A prediction market is a market that's created for the purpose of trading for the outcomes of events.
                    Traditionally, prediction markets will trade binary options for whether something will occur in the future.
                    If that yes or no option becomes true, then the trader is rewarded with some amount of money. If it resolves false,
                    then they are not rewarded anything.
                </p>
                <p>
                    Because of the efficient market hypothesis (the trading value of a commodity or stock reflects all known information)
                    , prediction markets can be used as a tool for crowd-sourcing the probabilities of something happening.
                    A good example of this is PredictIt, a prediction market for elections and other political events.
                    This particular prediction market doesn't trade options. Read more about how this particular market works below!
                </p>
            </div> : null }

            <div className='Tutorial-question' onClick={toggleThisMarket}>
                <h3>How does this particular market work?</h3>
            </div>
            {thisMarket ? <div className='Tutorial-answer'>
                <p>
                    Some keen observers might notice that this market differs wildly from the way that traditional prediction markets work.
                    They would be right! Instead of trading options like you would on a stock market, this market rewards users for adding information
                    to the market that corrects the previous prediciton. In essence, users who think the previous prediction is wrong will give their 
                    estimate instead, and if that estimate is more accurate, they get points. The next paragraph goes into more technical details. 
                </p>
                <p>
                    The market's scoring function is the only scoring function 
                    that is consistent with the rules of probability theory and Bayesian updating. For example, let's say that there's a market on whether
                    a video game will be released by a certain date. The market starts off at 50/50, which is usually a bad prediction, to encourage users to 
                    begin putting in their predictions. You could look through the company's history and find that 60% of the time, they release their games 
                    on schedule, so you start off with a 60/40 prediction. As the date nears, you might read about various problems the dev team is facing, so that
                    would update your probability towards a higher 'no' outcome. However, let's say someone who's more familiar with the project comes along and finds that 
                    the current predictions are too pessimistic. They can then try to correct the market towards what they think is the true probability. When the event eventually
                    resolves as either 'yes' or 'no', the market will reward them for however much they pushed the market towards the actual outcome.
                </p>
            </div> : null }

            <div className='Tutorial-question' onClick={toggleMarketBehavior}>
                <h3>What kind of behavior does this market reward?</h3>
            </div>
            {marketBehavior ? <div className='Tutorial-answer'>
                <p>There are three rules that will maximize the amount of points you'll recieve: 
                    <ol>
                        <li> Predict often;</li>
                        <li> Predict on markets where you think the most 
                            recent probability is wrong;</li>
                        <li>Always bet your true probability estimate.</li>
                    </ol>
                       Betting accurately will work out better on average than just trying to 
                    guess whether the event will happen or not and making extremely high or low predictions. 
                </p> 
            </div> : null }

            <div className='Tutorial-question' onClick={togglePredictionScore}>
                <h3>How are predictions scored? Can I trade in points for stuff?</h3>
            </div>
            {predictionScore ? <div className='Tutorial-answer'>
                <p>
                    The formula used is 100*log2(prediction/previous_prediction). Points cannot currently be used for anything, but we might add some nice flair in the future :)
                </p> 
            </div>: null }

            <div className='Tutorial-question' onClick={toggleSubmitPrediction}>
                <h3>How do I submit a prediction?</h3>
            </div>
            {submitPrediction ? <div className='Tutorial-answer'>
                <p>
                    Click on one of the events on the homepage, move the slider to your probability estimate, and click on the submit prediction button.
                </p>
            </div> : null }

            <div className='Tutorial-question' onClick={toggleCreateEvent}>
                <h3>How do I create an event?</h3>
            </div>
            {createEvent ? <div className='Tutorial-answer'>
                <p>
                    Click on the 'Create Event' button on the top right, fill out the details, choose a time for it to expire, and then submit it.
                </p>
            </div> : null }

            <div className='Tutorial-question' onClick={toggleWhatResolved}>
                <h3>What does it mean when an event is resolved or unresolved?</h3>
            </div>
            {whatResolved ? <div className='Tutorial-answer'>
                <p>
                    When an event is unresolved, it means that it's being actively traded on. Once either the conditions of the event have been met, or it has reached its expiration, 
                    it will locked from further predictions and labeled as 'resolved'. Then, an admin user can determine whether the event should be resolved as 'yes' or 'no'.
                </p>
            </div> : null }

            <div className='Tutorial-question' onClick={toggleAdminUser}>
                <h3>What's the difference between admin users and normal users?</h3>
            </div>
            {adminUser ? <div className='Tutorial-answer'>
                <p>
                    Anyone can make predictions, start new markets, and post comments. However, only admins can decide the outcome of an event.
                </p>
            </div> : null }
        </div>
    )
}

export default Tutorial