#geoffrey
from course_progress.helpers import get_overall_progress
from courseware.courses import get_course_by_id
from lms.djangoapps.grades.new.course_grade import CourseGradeFactory
from django.conf import settings
import json
from django.http import JsonResponse
from opaque_keys.edx.locations import SlashSeparatedCourseKey
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST,require_GET
from django.views.decorators.csrf import ensure_csrf_cookie
from xmodule.modulestore.django import modulestore
from course_progress.helpers import get_overall_progress

@ensure_csrf_cookie
@require_GET
@login_required
def ensure_certif(request,course_id):
    user_id = request.user.id
    username = request.user.username
    course_key = SlashSeparatedCourseKey.from_deprecated_string(course_id)
    course_tma = get_course_by_id(course_key)
    is_graded = course_tma.is_graded
    grade_cutoffs = modulestore().get_course(course_key, depth=0).grade_cutoffs['Pass'] * 100
    grading_note =  CourseGradeFactory().create(request.user, course_tma)
    passed = grading_note.passed
    percent = float(int(grading_note.percent * 1000)/10)
    overall_progress = get_overall_progress(request.user.id, course_key)
    context = {
        'passed':passed,
        'percent':percent,  
        'is_graded':is_graded,
        'grade_cutoffs':grade_cutoffs,
        'overall_progress':overall_progress
    }

    return JsonResponse(context)
