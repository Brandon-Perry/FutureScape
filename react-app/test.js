
const events = [
    {name:'event1', 'predictions':[1], 'created_at':2013 },
    {name:'event2', 'predictions':[1], 'created_at': 2014},
    {name: 'event3', 'predictions':[1], 'created_at': 2011}
  ]
  
  events.sort((a,b) => {
              const timeElapsedA = new Date.now() - new Date(a.created_at).getTime()
              const scoreA = a.predictions.length / Math.log(timeElapsedA)
              const timeElapsedB = new Date.now() - new Date(b.created_at).getTime()
              const scoreB = b.predictions.length / Math.log(timeElapsedB)
              
              return scoreA - scoreB
  })
  
  console.log(events)
  