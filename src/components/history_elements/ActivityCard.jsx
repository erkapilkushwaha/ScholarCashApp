import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

function getRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);

  const diff =
    Math.floor(
      (now - date) / 1000
    );

  if (diff < 60)
    return 'Just now';

  if (diff < 3600)
    return `${Math.floor(
      diff / 60
    )}m ago`;

  if (diff < 86400)
    return `${Math.floor(
      diff / 3600
    )}h ago`;

  if (diff < 604800)
    return `${Math.floor(
      diff / 86400
    )}d ago`;

  return date.toLocaleDateString();
}

function getStatusStyle(status) {
  switch (status?.toLowerCase()) {

    case 'completed':
      return {
        bg: '#dcfce7',
        text: '#16a34a',
      };

    case 'started':
      return {
        bg: '#dbeafe',
        text: '#2563eb',
      };

    case 'pending':
      return {
        bg: '#fef3c7',
        text: '#d97706',
      };

    case 'screenout':
      return {
        bg: '#fee2e2',
        text: '#dc2626',
      };

    case 'rejected':
      return {
        bg: '#fee2e2',
        text: '#dc2626',
      };

    default:
      return {
        bg: '#f1f5f9',
        text: '#64748b',
      };
  }
}

export default function ActivityCard({
  type,
  title,
  subtitle,
  amount,
  status,
  createdAt,
}) {
  const statusStyle =
    getStatusStyle(status);

  let icon = '🏦';

if (type === 'survey') {
  icon = '📝';
}

if (type === 'offerwall') {
  icon = '🎮';
}

if (type === 'earning') {
  icon = '💰';
}

  const amountColor =
    type === 'withdrawal'
      ? '#ef4444'
      : '#10b981';

  const amountPrefix =
    type === 'withdrawal'
      ? '-₹'
      : '+₹';
      

  return (
    <View style={styles.card}>

      {/* Left Icon */}
      <View
        style={styles.iconContainer}
      >
        <Text style={styles.icon}>
          {icon}
        </Text>
      </View>

      {/* Middle Content */}
      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={styles.title}
        >
          {title}
        </Text>

        <Text
          numberOfLines={1}
          style={styles.subtitle}
        >
          {subtitle}
        </Text>

        <View
          style={styles.metaRow}
        >
          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  statusStyle.bg,
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                {
                  color:
                    statusStyle.text,
                },
              ]}
            >
              {status}
            </Text>
          </View>

          <Text
            style={styles.time}
          >
            {getRelativeTime(
              createdAt
            )}
          </Text>
        </View>
      </View>

      {/* Amount */}
      <View
        style={styles.amountBlock}
      >
        <Text
          style={[
            styles.amount,
            {
              color:
                amountColor,
            },
          ]}
        >
          {amountPrefix}
          {Number(
            amount || 0
          ).toFixed(0)}
        </Text>
      </View>

    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',

      backgroundColor:
        '#ffffff',

      borderRadius: 18,

      padding: 14,

      marginBottom: 12,

      borderWidth: 1,
      borderColor: '#eef2f7',

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.04,
      shadowRadius: 5,

      elevation: 2,
    },

    iconContainer: {
      width: 48,
      height: 48,

      borderRadius: 14,

      backgroundColor:
        '#f8fafc',

      justifyContent:
        'center',

      alignItems:
        'center',

      marginRight: 12,
    },

    icon: {
      fontSize: 20,
    },

    content: {
      flex: 1,
      paddingRight: 10,
    },

    title: {
      fontSize: 14,
      fontWeight: '800',
      color: '#0f172a',
    },

    subtitle: {
      fontSize: 12,
      color: '#64748b',
      marginTop: 2,
    },

    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },

    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 999,
    },

    badgeText: {
      fontSize: 10,
      fontWeight: '700',
      textTransform:
        'capitalize',
    },

    time: {
      marginLeft: 8,
      fontSize: 11,
      color: '#94a3b8',
      fontWeight: '600',
    },

    amountBlock: {
      alignItems: 'flex-end',
    },

    amount: {
      fontSize: 15,
      fontWeight: '900',
    },
  });