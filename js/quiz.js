$(document).ready(function () {
  var quiz = $('#quiz')

  var quizReset = function () {
    quiz.find('.question-wrap').hide()
    quiz.find('#results').hide()
    quiz.find('#results .result').hide()
    quiz.find('.illegal, .unknown').removeClass('illegal unknown')
    quiz.find('#q-01').show()
    quiz.find('#reset').html('')
    localStorage.clear()
  }

  quizReset()

  quiz.find('#reset').click(function () {
    quizReset()
  })

  quiz.find('.answer').click(function () {
    $(this).parents('.question-wrap').hide()
    quiz.find('#reset').html('Start Over')

    var dataType = $(this).attr('data-type')
    var dataVal = $(this).attr('data-val')
    localStorage.setItem(dataType, dataVal)

    var route = $(this).attr('data-route')
    quiz.find('#' + route).show()

    if (route === 'results') {
      setResults()
    }
  })

  var setResults = function () {
    quiz.find('#reset').html('Retake the Quiz')
    var type = localStorage.getItem('type')
    var days = localStorage.getItem('days')
    var home = localStorage.getItem('home')
    var numberGuests = localStorage.getItem('number-guests')

    if (type === 'host') {
      var results = quiz.find('#host-results')
      results.show()

      if (days === 'gt30') {
        results.find('.gt30-description').show()
        results.find('.details').hide()
      } else {
        results.find('.gt30-description').hide()
        results.find('.details').show()
        if (home === 'no' || numberGuests === 'gt2') {
          results.find('.headline .legality').addClass('illegal')
        }
        if (home === 'no') {
          results.find('li[result-type="home"]').addClass('illegal')
        }
        if (numberGuests === 'gt2') {
          results.find('li[result-type="number-guests"]').addClass('illegal')
        }
      }
    }

    if (type === 'traveler') {
      var results = quiz.find('#traveler-results')
      results.show()

      if (days === 'gt30') {
        results.find('.gt30-description').show()
        results.find('.details').hide()
      } else {
        results.find('.gt30-description').hide()
        results.find('.details').show()
        if (home === 'no' || numberGuests === 'gt2') {
          results.find('.headline .legality').addClass('illegal')
        }
        if (home === 'maybe' && numberGuests === 'lt3') {
          results.find('.headline .legality').addClass('unknown')
        }
        if (home === 'no') {
          results.find('li[result-type="home"]').addClass('illegal')
        }
        if (home === 'maybe') {
          results.find('li[result-type="home"]').addClass('unknown')
        }
        if (numberGuests === 'gt2') {
          results.find('li[result-type="number-guests"]').addClass('illegal')
        }
      }
    }
  }
})
