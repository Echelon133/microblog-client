import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    login: {
      login: 'Login',
      username: 'Username',
      password: 'Password',
      success: 'Login successful',
      failure: 'Login failed'
    },
    register: {
      register: 'Register',
      required: 'Field required',
      emailInvalid: 'Email is incorrect',
      usernameRequirements: '1-30 characters required, only lowercase/uppercase letters and digits',
      passwordRequirements: '8-64 characters required, lowercase/uppercase letters, at least one digit and one special character',
      passwordsMatch: 'Passwords must match',
      success: 'User registration successful',
      usernameTaken: 'Username already taken',
      failureMsg: 'Failed to register a new user',
      email: 'Email',
      username: 'Username',
      password: 'Password'
    },
    editUserProfile: {
      editProfile: 'Edit profile',
      success: 'Changes saved',
      failure: 'Failed to save changes',
      displayedUsername: 'Displayed username',
      description: 'User description',
      aviURL: 'Avatar URL',
      saveEdit: 'Save'
    },
    feed: {
      postContent: 'New post content',
      send: 'Send',
      showing: 'Showing',
      mostPopular: 'most popular',
      mostRecent: 'most recent',
      failure: 'Failed to add a new post'
    },
    header: {
      microblog: 'Microblog',
      username: 'Username',
      logout: 'Log out',
      login: 'Log in',
      register: 'Register'
    },
    notFound: {
      notFound: 'Page not found'
    },
    post: {
      replyingTo: 'Replying to',
      postRemoved: 'post removed',
      responseContent: 'Response content',
      respond: 'Respond',
      quoteContent: 'Quote response content',
      quote: 'Quote',
      deleteConfirm: 'Are you sure you want to remove the post?',
      deleteSuccess: 'Post deletion successful',
      deleteFailed: 'Failed to delete the post',
      userNotLogged: 'User not logged in',
      responseFailed: 'Failed to send the response',
      quoteFailed: 'Failed to send the quote'
    },
    postList: {
      noPosts: 'No posts'
    },
    postView: {
      postDeleted: 'Deleted post'
    },
    sidePanel: {
      popularTags: 'Popular tags',
      filter: 'Filter',
      lastHour: 'Last hour',
      lastDay: 'Last day',
      lastWeek: 'Last week'
    },
    tagOverview: {
      loadMore: 'Load more posts'
    },
    userProfile: {
      editProfile: 'Edit profile',
      unfollow: 'Unfollow',
      follow: 'Follow',
      loadMore: 'Load more',
      following: 'Following',
      followedBy: 'Followed by',
      loadMorePosts: 'Load more posts',
      userNotLogged: 'User not logged in',
      failedToCancelFollow: 'Failed to cancel the follow',
      failedToFollow: 'Failed to follow'
    }
  },
  pl: {
    login: {
      login: 'Zaloguj',
      username: 'Nazwa użytkownika',
      password: 'Hasło',
      success: 'Logowanie udane',
      failure: 'Logowanie nieudane'
    },
    register: {
      register: 'Zarejestruj',
      required: 'Pole jest wymagane',
      emailInvalid: 'Adres email jest niepoprawny',
      usernameRequirements: 'Nazwa użytkownika musi mieć 1-30 znaków, zawierać wyłącznie małe/duże litery oraz cyfry',
      passwordRequirements: 'Hasło musi mieć 8-64 znaków, zawierać wielkie i małe litery, co najmniej jedną cyfrę oraz co najmniej jeden znak specjalny',
      passwordsMatch: 'Hasła muszą się zgadzać',
      success: 'Rejestracja zakończona powodzeniem',
      usernameTaken: 'Nazwa użytkownika jest już zajęta',
      failureMsg: 'Podczas rejestracji wystąpił błąd',
      email: 'Adres email',
      username: 'Nazwa użytkownika',
      password: 'Hasło'
    },
    editUserProfile: {
      editProfile: 'Edytuj profil',
      success: 'Edytowanie udane',
      failure: 'Edytowanie nieudane',
      displayedUsername: 'Wyświetlana nazwa użytkownika',
      description: 'Opis użytkownika',
      aviURL: 'URL avatara',
      saveEdit: 'Zapisz'
    },
    feed: {
      postContent: 'Treść nowego wpisu',
      send: 'Wyślij',
      showing: 'Pokazywane',
      mostPopular: 'najpopularniejsze',
      mostRecent: 'najnowsze',
      failure: 'Dodawanie posta zakończyło się niepowodzeniem'
    },
    header: {
      microblog: 'Mikroblog',
      username: 'Nazwa użytkownika',
      logout: 'Wyloguj',
      login: 'Zaloguj',
      register: 'Zarejestruj'
    },
    notFound: {
      notFound: 'Nie znaleziono strony'
    },
    post: {
      replyingTo: 'W odpowiedzi do',
      postRemoved: 'post usunięty',
      responseContent: 'Treść odpowiedzi',
      respond: 'Odpowiedz',
      quoteContent: 'Treść odpowiedzi cytującej',
      quote: 'Cytuj',
      deleteConfirm: 'Czy na pewno chcesz usunąć post?',
      deleteSuccess: 'Usunięto post',
      deleteFailed: 'Nie udało się usunąć postu',
      userNotLogged: 'Użytkownik nie jest zalogowany',
      responseFailed: 'Nie można wysłać odpowiedzi',
      quoteFailed: 'Nie można wysłać cytatu'
    },
    postList: {
      noPosts: 'Brak postów'
    },
    postView: {
      postDeleted: 'Post usunięty'
    },
    sidePanel: {
      popularTags: 'Popularne',
      filter: 'Filtr',
      lastHour: 'Ostatnia godzina',
      lastDay: 'Ostatnie 24h',
      lastWeek: 'Ostatni tydzień'
    },
    tagOverview: {
      loadMore: 'Wczytaj więcej postów'
    },
    userProfile: {
      editProfile: 'Edytuj profil',
      unfollow: 'Nie obserwuj',
      follow: 'Obserwuj',
      loadMore: 'Wczytaj więcej',
      following: 'Obserwowani',
      followedBy: 'Obserwujący',
      loadMorePosts: 'Wczytaj więcej postów',
      userNotLogged: 'Użytkownik nie jest zalogwany',
      failedToCancelFollow: 'Nie udało się anulować obserwowania',
      failedToFollow: 'Nie udało się obserwować użytkownika'
    }
  }
}

export default new VueI18n({
  locale: 'en',
  messages
})
