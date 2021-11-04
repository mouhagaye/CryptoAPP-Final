"""
Django settings for reference server.
"""
import os
import environ
from django.utils.translation import gettext_lazy as _

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load environment variables from .env
env = environ.Env()
env_file = os.path.join(BASE_DIR, ".env")
if os.path.exists(env_file):
    environ.Env.read_env(env_file)

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = env("DJANGO_SECRET_KEY")

MULT_ASSET_ADDITIONAL_SIGNING_SEED = env(
    "MULT_ASSET_ADDITIONAL_SIGNING_SEED", default=None
)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []



# polaris-----------------------------
POLARIS_ACTIVE_SEPS = ["sep-1", "sep-10", "sep-24", "sep-31", "sep-12"]
POLARIS_STELLAR_NETWORK_PASSPHRASE="Standalone Network ; February 2017"
POLARIS_HORIZON_URI="http://localhost:8000"
POLARIS_HOST_URL="https://localhost:9000"
POLARIS_SERVER_JWT_KEY='<your secret string for encrypting JWTs>'
POLARIS_SIGNING_SEED="SCG2WJ4NRIK6KHFYAMGRRYQVJQKP5LXD7GM6CN3JKPRNRPUNLADMN7DW"
LOCAL_MODE=False
# polaris-----------------------------
SECRET_KEY="ysnorovj)=yhdz3qhmaz4r^le_f-@g%r$-wll1dho4e&*6z$m3"

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "server",
    "polaris",
    'sslserver',
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
]

# Redirect HTTP to HTTPS if not in local mode
SECURE_SSL_REDIRECT = not env.bool("LOCAL_MODE", default=False)
if SECURE_SSL_REDIRECT:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

APPEND_SLASH = False

ROOT_URLCONF = "server.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "server.wsgi.application"

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    "default": env.db(
        "DATABASE_URL",
        default="sqlite:///" + os.path.join(BASE_DIR, "data/db.sqlite3"),
    )
}

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "America/Los_Angeles"
USE_I18N = True
USE_L10N = True
USE_TZ = True
USE_THOUSAND_SEPARATOR = True
LANGUAGES = [
    ("en", _("English")),
    ("pt", _("Portuguese")),
    ("id", _("Bahasa Indonesia")),
]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

FORM_RENDERER = "django.forms.renderers.TemplatesSetting"

STATIC_ROOT = os.path.join(BASE_DIR, "server/collectstatic")
STATIC_URL = "/static/"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Django Rest Framework Settings:

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
        "rest_framework.renderers.TemplateHTMLRenderer",
    ],
    "PAGE_SIZE": 10,
}

# Email Settings

EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = env("EMAIL_HOST_USER", default=None)
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD", default=None)
EMAIL_USE_TLS = True
EMAIL_PORT = 587

# CORS configuration

CORS_ORIGIN_ALLOW_ALL = True

# Logging

LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "verbose": {"format": "{asctime} - {levelname}: {message}", "style": "{",},
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "level": "DEBUG",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "server": {"handlers": ["console"], "propogate": False, "level": "INFO"},
        "polaris": {"handlers": ["console"], "propogate": False, "level": "DEBUG"},
        "django": {"handlers": ["console"], "propogate": False, "level": "INFO"},
    },
}
