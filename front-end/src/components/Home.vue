<template>

  <div>
    <Box
      :left="true"
      :green="true"
      B_title="Ένα μέρος για όλη σου τη δουλειά"
      B_subtitle=""
      B_comment="Σχεδιάστε, παρακολουθήστε και οργανώστε καλύτερα τα έργα και τις εργασίες σας με ένα λογισμικό all-in-one που σας ταιριάζει."
      text_width="30%"
      img="team1.svg"
      alt="team1"
      img_height="60%"
      img_width="50%"
    />
    <Box
      :center="true"
      B_title=""
      B_subtitle="Το απόλυτο εργαλείο διαχείρησης έργων με τη μεθοδολιγία scrum"
      B_comment="Μια λύση διαχείρησης έργων που βοηθά ομάδες ανάπτυξης να χειρίζονται όλα τα έργα τους σε ένα μέρος, απο την αρχή μέχρι και το τέλος."
      text_width="50%"
    />
    <Box
      :left="true"
      :green="true"
      B_title="Εργαστείτε με τον τρόπο που εσείς θέλετε"
      B_subtitle=""
      B_comment="Οργανώστε και σχεδιάστε τα έργα ανάλογα με τη ροή εργασίας της επιχείρησης σας."
      text_width="30%"
      img="team2.svg"
      alt="team2"
      img_height="70%"
      img_width="50%"
    />
    <Box
      :right="true"
      B_title="Δεν πρόκειται να χάσετε άλλη προθεσμία"
      B_subtitle=""
      B_comment="Αναπαραστείστε τα δεδομένα σας σε επιχειρηματικές μετρικές και αποκτήστε πλήρη ορατότητα στον χάρτη πορείας σας."
      text_width="50%"
      img="team6.svg"
      alt="team"
      img_height="60%"
      img_width="50%"
    />
    <Box
      :left="true"
      :green="true"
      B_title="Αυξήστε την παραγωγικότητα σας"
      B_subtitle=""
      B_comment="Διευκολύνεται τη συνεργασία συγκεντρώνοντας τις ομάδες σας σε μια ενιαία πλατφόρμα. Βελτιώστε την παραγιγικότητα της ομάδας σας βοηθώντας τους να δώσουν προτεραιότητα και να επικαιντρωθούν στις εργασίες που έχουν μεγαλύτερη σημασία."
      text_width="40%"
      img="team5.svg"
      alt="team"
      img_height="70%"
      img_width="60%"
    />
    <Box
      :right="true"
      B_title="Εξοικονομήστε χρόνο, μείνετε συγκεντρωμένοι και εργαστείτε έξυπνα"
      B_subtitle=""
      B_comment="Ξοδέψτε λιγότερο χρόνο συντήρησης και περισσότερο παράγοντας αποτελέσματα. Με τις αναφορές που δημιουργούνται αυτόματα, αποκτάτε προβολή σε πραγματικό χρόνο σε ολόκληρο το έργο και πιθανά ζητήματα."
      text_width="40%"
      img="team7.svg"
      alt="team"
      img_height="80%"
      img_width="50%"
    />
    <Box
      :left="true"
      :green="true"
      B_title="Κρατήστε το ιστορικό σας"
      B_subtitle=""
      B_comment="Εργαστείτε με αυτοποποίθηση και βλέποντας την πρόοδο σας και γνωρίζοντας πως οι πληροφορίες που έχτε και πάντα ακριβείς και ενημερωμένες."
      text_width="30%"
      img="team3.svg"
      alt="team"
      img_height="60%"
      img_width="50%"
    />
    <Box
      :right="true"
      B_title="Νιώστε ελεύθερα να εκφραστείτε"
      B_subtitle=""
      B_comment="Το ScruManiac προσφέρει τη δυνατότητα στα μέλη μιας ομάδας να σχολιάζουν σχετικά με οτισήποτε στα διάφορα Tasks ενός Sprint."
      text_width="40%"
      img="team5.png"
      alt="team"
      img_height="70%"
      img_width="50%"
    />
    <Prices />
    <Box
      :center="true"
      B_title=""
      B_subtitle="Το scrum είναι σαν την πεθερά σου ... Επισημαίνει ΟΛΑ σου τα λάθη !"
      B_comment="~ Ken Schwaber"
      text_width=""
      extra="border-left:5px solid var(--blue_grey)"
    />
  </div>
</template>

<script>
  import Box from "./homepage/box.vue";
  import Prices from "./pricing/Prices.vue";

  export default {
    name: "HomeBody",
    components: {
      Box,
      Prices,
    },
  };
</script>
