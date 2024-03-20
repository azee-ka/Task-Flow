# myapp/management/commands/delete_tasks.py

from django.core.management.base import BaseCommand, CommandError
from src.task.models import Task

class Command(BaseCommand):
    help = 'Deletes all Task objects'

    def handle(self, *args, **options):
        try:
            obj_count_before = Task.objects.count()

            Task.objects.all().delete()
            obj_count_after = Task.objects.count()
            
            self.stdout.write(self.style.SUCCESS(f'Successfully deleted {obj_count_before} Task objects. Total tasks now: {obj_count_after}'))
        except Exception as e:
            raise CommandError(f'Failed to delete Task objects: {e}')
