from datetime import datetime, timedelta
from models.models import RefreshToken
from db import db

def cleanup_expired_refresh_tokens(expiry_seconds):
    cutoff_time = datetime.utcnow() - timedelta(seconds=expiry_seconds)
    expired_tokens = RefreshToken.query.filter(RefreshToken.created_at < cutoff_time).all()
    for token in expired_tokens:
        db.session.delete(token)
    db.session.commit()
