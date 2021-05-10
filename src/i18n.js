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
      failure: 'Failed to add a new post',
      morePosts: 'Load more posts'
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
      quoteFailed: 'Failed to send the quote',
      delete: 'Delete',
      report: 'Report'
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
      failedToFollow: 'Failed to follow',
      followedByModal: 'Users who follow me',
      followingModal: 'Users followed by me'
    },
    notificationDropdown: {
      markAll: 'Mark all as',
      read: 'read',
      viewMore: 'View more'
    },
    notificationItem: {
      quote: 'quoted your post',
      mention: 'mentioned you in a post',
      response: 'responded to your post'
    },
    notificationView: {
      allNotifications: 'All notifications',
      noNotifications: 'No notifications',
      moreNotifications: 'More notifications'
    },
    notificationItemLarge: {
      quote: 'quoted your post',
      mention: 'mentioned you in a post',
      response: 'responded to your post'
    },
    reportPost: {
      reportPost: 'Report post',
      success: 'Post reported',
      failure: 'Failed to report post',
      reason: 'Report reason',
      spam: 'Spam',
      abusive: 'Abusive towards me/others',
      againstTos: 'Against Terms of Service',
      description: 'Additional details of this report (optional)',
      report: 'Report'
    },
    reportsPanel: {
      reportsPanel: 'Reports panel',
      showAlreadyModerated: 'Show already moderated',
      loadMore: 'Load more reports',
      reportedBy: 'Reported by',
      postAuthor: 'Post author',
      postContent: 'Post content',
      deleted: 'Deleted',
      reason: 'Reason',
      description: 'Description',
      reportChecked: 'Report checked',
      action: 'Action'
    },
    reportsPanelRow: {
      accept: 'Accept',
      reject: 'Reject',
      spam: 'Spam',
      againstTos: 'Against ToS',
      abusive: 'Abusive'
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
      failure: 'Dodawanie posta zakończyło się niepowodzeniem',
      morePosts: 'Wczytaj więcej postów'
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
      quoteFailed: 'Nie można wysłać cytatu',
      delete: 'Usuń',
      report: 'Zgłoś'
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
      failedToFollow: 'Nie udało się obserwować użytkownika',
      followedByModal: 'Lista obserwujących',
      followingModal: 'Lista obserwowanych'
    },
    notificationDropdown: {
      markAll: 'Oznacz wszystkie jako',
      read: 'przeczytane',
      viewMore: 'Zobacz wszystkie'
    },
    notificationItem: {
      quote: 'zacytował Twój post',
      mention: 'wspomniał o Tobie w poście',
      response: 'odpowiedział na Twój post'
    },
    notificationView: {
      allNotifications: 'Wszystkie powiadomienia',
      noNotifications: 'Brak powiadomień',
      moreNotifications: 'Więcej powiadomień'
    },
    notificationItemLarge: {
      quote: 'zacytował Twój post',
      mention: 'wspomniał o Tobie w poście',
      response: 'odpowiedział na Twój post'
    },
    reportPost: {
      reportPost: 'Zgłoś post',
      success: 'Post zgłoszony',
      failure: 'Zgłoszenie posta nieudane',
      reason: 'Powód zgłoszenia',
      spam: 'Spam',
      abusive: 'Treść obrażająca mnie/innych',
      againstTos: 'Przeciwko regulaminowi strony',
      description: 'Dodatkowe detale zgłoszenia (opcjonalne)',
      report: 'Zgłoś'
    },
    reportsPanel: {
      reportsPanel: 'Panel zgłoszeń',
      showAlreadyModerated: 'Pokaż już sprawdzone',
      loadMore: 'Załaduj więcej zgłoszeń',
      reportedBy: 'Zgłoszone przez',
      postAuthor: 'Autor posta',
      postContent: 'Treść posta',
      deleted: 'Post usunięty',
      reason: 'Powód zgłoszenia',
      description: 'Opis',
      reportChecked: 'Sprawdzone',
      action: 'Akcja'
    },
    reportsPanelRow: {
      accept: 'Zgłoszenie poprawne',
      reject: 'Zgłoszenie niepoprawne',
      spam: 'Spam',
      againstTos: 'Przeciwko regulaminowi',
      abusive: 'Obraźliwa treść'
    }
  }
}

export default new VueI18n({
  locale: 'en',
  messages
})
