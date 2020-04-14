$(document).ready(function () {
  var quiz = $('#quiz')

  var quizReset = function () {
    quiz.find('.question-wrap').hide()
    quiz.find('#results').hide()
    quiz.find('#q-01').show()
    quiz.find('.illegal').removeClass('illegal')
    localStorage.clear()
  }

  quizReset()

  quiz.find('.answer').click(function () {
    $(this).parents('.question-wrap').hide()

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
    var type = localStorage.getItem('type')

    if (type === 'host') {
      var days = localStorage.getItem('days')
      var home = localStorage.getItem('home')
      var numberGuests = localStorage.getItem('number-guests')

      var results = quiz.find('#host-results')
      results.show()

      if (days === 'gt30') {
        results.find('.gt30-description').show()
      } else {
        results.find('.gt30-description').hide()
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
  }

  quiz.find('#reset').click(function () {
    quizReset()
  })
})
