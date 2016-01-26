I18n.translations || (I18n.translations = {});
I18n.translations["en"] = I18n.extend((I18n.translations["en"] || {}), {"actions":"Actions","activerecord":{"errors":{"messages":{"record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"many":"Cannot delete record because dependent %{record} exist","one":"Cannot delete record because a dependent %{record} exists"}}}},"add":"Add","add_contact":"Add Contact","add_contact_for":"Add Contact Person for","add_customer":"Add Customer","add_project":"Add Project","add_project_for":"Add Project for","add_task":"Add Task","add_task_for_project":"Add Task for Project","added":"Added","added_success":"added successfully","address":"address","colour":"Colour","comment":"Comment","confirm_delete":"Are you sure?","contact_name":"Name","contact_people":"Contacts","contact_person":"Contact Person","contact_persons":"Contacts","customer":"Customer","customer_info":"Сustomer Info","customer_name":"Customer Name","customers":"Customers","date":{"abbr_day_names":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"abbr_month_names":[null,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"day_names":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"formats":{"default":"%Y-%m-%d","long":"%B %d, %Y","short":"%b %d"},"month_names":[null,"January","February","March","April","May","June","July","August","September","October","November","December"],"order":["year","month","day"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"about 1 hour","other":"about %{count} hours"},"about_x_months":{"one":"about 1 month","other":"about %{count} months"},"about_x_years":{"one":"about 1 year","other":"about %{count} years"},"almost_x_years":{"one":"almost 1 year","other":"almost %{count} years"},"half_a_minute":"half a minute","less_than_x_minutes":{"one":"less than a minute","other":"less than %{count} minutes"},"less_than_x_seconds":{"one":"less than 1 second","other":"less than %{count} seconds"},"over_x_years":{"one":"over 1 year","other":"over %{count} years"},"x_days":{"one":"1 day","other":"%{count} days"},"x_minutes":{"one":"1 minute","other":"%{count} minutes"},"x_months":{"one":"1 month","other":"%{count} months"},"x_seconds":{"one":"1 second","other":"%{count} seconds"}},"prompts":{"day":"Day","hour":"Hour","minute":"Minute","month":"Month","second":"Seconds","year":"Year"}},"day":"Day","delete":"Delete","deleted_success":"deleted successfully","description":"Description","devise":{"confirmations":{"confirmed":"Your email address has been successfully confirmed.","send_instructions":"You will receive an email with instructions for how to confirm your email address in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes."},"failure":{"already_authenticated":"You are already signed in.","inactive":"Your account is not activated yet.","invalid":"Invalid %{authentication_keys} or password.","last_attempt":"You have one more attempt before your account is locked.","locked":"Your account is locked.","not_found_in_database":"Invalid %{authentication_keys} or password.","timeout":"Your session expired. Please sign in again to continue.","unauthenticated":"You need to sign in or sign up before continuing.","unconfirmed":"You have to confirm your email address before continuing."},"mailer":{"confirmation_instructions":{"subject":"Confirmation instructions"},"password_change":{"subject":"Password Changed"},"reset_password_instructions":{"subject":"Reset password instructions"},"unlock_instructions":{"subject":"Unlock instructions"}},"omniauth_callbacks":{"failure":"Could not authenticate you from %{kind} because \"%{reason}\".","success":"Successfully authenticated from %{kind} account."},"passwords":{"no_token":"You can't access this page without coming from a password reset email. If you do come from a password reset email, please make sure you used the full URL provided.","send_instructions":"You will receive an email with instructions on how to reset your password in a few minutes.","send_paranoid_instructions":"If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.","updated":"Your password has been changed successfully. You are now signed in.","updated_not_active":"Your password has been changed successfully."},"registrations":{"destroyed":"Bye! Your account has been successfully cancelled. We hope to see you again soon.","signed_up":"Welcome! You have signed up successfully.","signed_up_but_inactive":"You have signed up successfully. However, we could not sign you in because your account is not yet activated.","signed_up_but_locked":"You have signed up successfully. However, we could not sign you in because your account is locked.","signed_up_but_unconfirmed":"A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.","update_needs_confirmation":"You updated your account successfully, but we need to verify your new email address. Please check your email and follow the confirm link to confirm your new email address.","updated":"Your account has been updated successfully."},"sessions":{"already_signed_out":"Signed out successfully.","signed_in":"Signed in successfully.","signed_out":"Signed out successfully."},"unlocks":{"send_instructions":"You will receive an email with instructions for how to unlock your account in a few minutes.","send_paranoid_instructions":"If your account exists, you will receive an email with instructions for how to unlock it in a few minutes.","unlocked":"Your account has been unlocked successfully. Please sign in to continue."}},"done":"Done","edit":"Edit","edit_contact":"Edit Contact","edit_customer":"Edit Customer","edit_project":"Edit Project","edit_task":"Edit Task","end_date":"Deadline","end_time":"Deadline","errors":{"format":"%{attribute} %{message}","messages":{"accepted":"must be accepted","already_confirmed":"was already confirmed, please try signing in","blank":"can't be blank","confirmation":"doesn't match %{attribute}","confirmation_period_expired":"needs to be confirmed within %{period}, please request a new one","empty":"can't be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","expired":"has expired, please request a new one","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","inclusion":"is not included in the list","invalid":"is invalid","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","not_a_number":"is not a number","not_an_integer":"must be an integer","not_found":"not found","not_locked":"was not locked","not_saved":{"one":"1 error prohibited this %{resource} from being saved:","other":"%{count} errors prohibited this %{resource} from being saved:"},"odd":"must be odd","other_than":"must be other than %{count}","present":"must be blank","taken":"has already been taken","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"}}},"filter":"Filter","first_name":"First Name","flash":{"actions":{"create":{"notice":"%{resource_name} was successfully created."},"destroy":{"alert":"%{resource_name} could not be destroyed.","notice":"%{resource_name} was successfully destroyed."},"update":{"notice":"%{resource_name} was successfully updated."}}},"go_to_contact":"Go to Contact","go_to_contact_people_list":"Go to Contact List","go_to_customer":"Go to Customer","go_to_customer_list":"Go to Customer List","go_to_project":"Go to project","go_to_project_list":"Go to Project List","go_to_task":"Go to Task","go_to_task_list":"Go to Task List","hello":"Hello world","helpers":{"select":{"prompt":"Please select"},"submit":{"create":"Create %{model}","submit":"Save %{model}","update":"Update %{model}"}},"home":"Home","in_work":"In work","last_name":"Last Name","log_in":"Log in","login":"Login","logout":"Logout","middle_name":"Middle Name","month":"Month","name":"Name","new":"New","next":"Next","number":{"currency":{"format":{"delimiter":",","format":"%u%n","precision":2,"separator":".","significant":false,"strip_insignificant_zeros":false,"unit":"$"}},"format":{"delimiter":",","precision":3,"separator":".","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"Billion","million":"Million","quadrillion":"Quadrillion","thousand":"Thousand","trillion":"Trillion","unit":""}},"format":{"delimiter":"","precision":3,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"gb":"GB","kb":"KB","mb":"MB","tb":"TB"}}},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}}},"on_site_or":"on site or","open":"Open","paid":"Paid","password":"Password","paused":"Paused","phone":"Phone","position":"Position","previous":"Previous","project":"Project","project_name":"Project Title","project_title":"Title","projects":"Projects","register":"register","register_nav":"Register","save":"Save","select_customer":"Select Customer","select_project":"Select Project","select_status":"Select Status","short_description":"Short Description","start_date":"Start Date","start_time":"Start time","status":"Status","support":{"array":{"last_word_connector":", and ","two_words_connector":" and ","words_connector":", "}},"task":"Task","task_calendar":"Task Calendar","task_name":"Task Name","tasks":"Tasks","tasks_without_project":"Tasks (without Project)","time":{"am":"am","formats":{"default":"%a, %d %b %Y %H:%M:%S %z","long":"%B %d, %Y %H:%M","short":"%d %b %H:%M"},"pm":"pm"},"to_start_work":"to start work","today":"Today","updated_success":"updated successfully","week":"Week","welcome_to_textup":"Welcome to TextUp!","year":"Year"});
I18n.translations["ru"] = I18n.extend((I18n.translations["ru"] || {}), {"actions":"Действия","add":"Добавить","add_contact":"Добавить контакт","add_contact_for":"Добавить контактное лицо для","add_customer":"Добавить заказчика","add_project":"Добавить проект","add_project_for":"Добавить проект для","add_task":"Добавить задачу","add_task_for_project":"Добавить задачу для проекта","added":"Добавлен","added_success":"добавлен успешно","address":"адрес","colour":"Цвет","comment":"Комментарий","confirm_delete":"Вы уверены?","contact_name":"Имя","contact_people":"Контакты","contact_person":"Контактное лицо","contact_persons":"Контактные лица","customer":"Заказчик","customer_info":"Карточка заказчика","customer_name":"Название компании","customers":"Заказчики","day":"День","delete":"Удалить","deleted_success":"удалён успешно","description":"Описание","done":"Выполнена","edit":"Редактировать","edit_contact":"Редактировать контакт","edit_customer":"Редактировать карточку заказчика","edit_project":"Редактировать проект","edit_task":"Редактировать задачу","end_date":"Планируемая дата завершения (deadline)","end_time":"Время завершения (deadline)","filter":"Фильтр","first_name":"Имя","go_to_contact":"Перейти к контакту","go_to_contact_people_list":"К списку контактов","go_to_customer":"Перейти к карточке заказчика","go_to_customer_list":"К списку заказчиков","go_to_project":"Перейти к проекту","go_to_project_list":"К списку проектов","go_to_task":"Перейти к задаче","go_to_task_list":"К списку задач","home":"Главная","in_work":"В работе","last_name":"Фамилия","log_in":"Войдите","login":"Войти","logout":"Выйти","middle_name":"Отчество","month":"Месяц","name":"Название","new":"Новая","next":"Следующий","on_site_or":"на сайт или","open":"Открыта","paid":"Оплачена","password":"Пароль","paused":"Отложена","phone":"Телефон","position":"Должность","previous":"Предыдущий","project":"Проект","project_name":"Название проекта","project_title":"Название","projects":"Проекты","register":"зарегистрируйтесь","register_nav":"Регистрация","save":"Сохранить","select_customer":"Выберите компанию","select_project":"Выберите проект","select_status":"Выберите статус","short_description":"Краткое описание","start_date":"Дата начала","start_time":"Время начала","status":"Статус","task":"Задача","task_calendar":"Календарь задач","task_name":"Имя задачи","tasks":"Задачи","tasks_without_project":"Задачи (без проекта)","to_start_work":"чтобы начать работу","today":"Сегодня","updated_success":"обновлён успешно","week":"Неделя","welcome_to_textup":"Добро пожаловать в TextUp!","year":"Год"});
