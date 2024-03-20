# myapp/management/commands/delete_tasks.py

from django.core.management.base import BaseCommand, CommandError
from src.user.models import BaseUser

class Command(BaseCommand):
    help = 'Deletes all Task objects'

    def handle(self, *args, **options):
        try:
            obj_count_before = BaseUser.objects.count()

            BaseUser.objects.all().delete()
            obj_count_after = BaseUser.objects.count()
            
            self.stdout.write(self.style.SUCCESS(f'Successfully deleted {obj_count_before} Task objects. Total users now: {obj_count_after}'))
        except Exception as e:
            raise CommandError(f'Failed to delete Task objects: {e}')
