from setuptools import setup, find_packages

print find_packages()

setup(
    name='django-map-fields',
    version='1.0',
    description='Few useful fields and widgets for map handling.',
    author='vencax',
    author_email='vencax77@gmail.com',
    url='https://github.com/vencax/django-map-fields',
    packages=find_packages(),
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Web Environment',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Framework :: Django',
    ],
    include_package_data=True,
)