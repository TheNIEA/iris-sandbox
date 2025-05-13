// This file exports all icons for easy imports
// Import specific icons
import ChevronDownIcon from './ChevronDownIcon.vue';
import ChevronUpIcon from './ChevronUpIcon.vue';
import ChevronLeftIcon from './ChevronLeftIcon.vue';
import ChevronRightIcon from './ChevronRightIcon.vue';
import CloseIcon from './CloseIcon.vue';
import PlusIcon from './PlusIcon.vue';
import MinusIcon from './MinusIcon.vue';
import SearchIcon from './SearchIcon.vue';
import UserIcon from './UserIcon.vue';
import DocumentIcon from './DocumentIcon.vue';
import TicketIcon from './TicketIcon.vue';
import ShareIcon from './ShareIcon.vue';
import DownloadIcon from './DownloadIcon.vue';
import GlobeIcon from './GlobeIcon.vue';
import CheckIcon from './CheckIcon.vue';
import HomeIcon from './HomeIcon.vue';

// Export all icons
export {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  PlusIcon,
  MinusIcon,
  SearchIcon,
  UserIcon,
  DocumentIcon,
  TicketIcon,
  ShareIcon,
  DownloadIcon,
  GlobeIcon,
  CheckIcon,
  HomeIcon
};

// Export a mapping of icon names to components for dynamic usage
export const iconMap = {
  'chevron-down': ChevronDownIcon,
  'chevron-up': ChevronUpIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'close': CloseIcon,
  'plus': PlusIcon,
  'minus': MinusIcon,
  'search': SearchIcon,
  'user': UserIcon,
  'document': DocumentIcon,
  'ticket': TicketIcon,
  'share': ShareIcon,
  'download': DownloadIcon,
  'globe': GlobeIcon,
  'check': CheckIcon,
  'home': HomeIcon
};

// Helper component for dynamic icon rendering
export { default as DynamicIcon } from './DynamicIcon.vue';