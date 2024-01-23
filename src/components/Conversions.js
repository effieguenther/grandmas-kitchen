import { Card, CardTitle, CardBody, Row, Col, Container } from "reactstrap"

export default function Conversions() {

    const veganConversions = [
        { item: "Milk", sub: "Almond, Soy, Oat, or Coconut milk" },
        { item: "Heavy Cream or Half + Half", sub: "Coconut cream or cashew cream. You can make cashew cream by soaking cashews in water and blending." },
        { item: "Sweetened Condesnsed Milk", sub: "Sweetened condensed coconut milk" },
        { item: "Evaporated Milk", sub: "For 1 Cup evaporated milk, simmer 2 Cups non-dairy milk for 40 min. or until liquid reduces by 1/2 (almond is best for this)" },
        { item: "Yogurt/Buttermilk", sub: "For each 1 Cup, use 3/4 C non-dariy milk + 2 Tbsp vinegar" },
        { item: "Cream Cheese", sub: "Silken tofu, pureed with a little water" },
        { item: "Sour Cream", sub: "Unsweetened coconut (or cashew) cream + a little lemon juice" },
        { item: "Cool Whip", sub: "Store-bought vegan whipped cream, or homemade with coconut cream (many recipes online)" },
        { item: "Melted Butter", sub: "Vegetable oil, olive oil, or coconut oil" },
        { item: "Softened/Solid Butter", sub: "Virgin coconut oil, vegetable shortening, or vegan butter" },
        { item: "Eggs ", sub: "For 1 egg: 1 Tbsp ground flaxseed + 3 Tbsp water, let sit for 10 minutes" },
        { item: "Parmesan Cheese", sub: "Nutritional Yeast" },
        { item: "Cheddar Cheese", sub: "Daiaya brand vegan cheese, or homemade (many recipes online)" },
        { item: "Meat", sub: "Jackfruit, chick peas, beans, tofu, cauliflower, mushrooms, or tempeh" }
    ]

    const healthyConversions = [
        { item: "Oil", sub: "When baking, replace 1/2 the oil with applesauce" },
        { item: "White Rice", sub: "Brown Rice" },
        { item: "Pasta Noodles", sub: "Whole wheat pasta noodles" },
        { item: "Sour Cream", sub: "Plain yogurt (not vanilla), regular or Greek" },
        { item: "Salt", sub: "Garlic, ginger, onion powder, and/or lemon juice" },
        { item: "All-purpose Flour", sub: "Whole wheat flour" },
        { item: "Cream Cheese", sub: "Silken tofu, pureed with a little water" },
        { item: "Bacon", sub: "Turkey bacon" },
        { item: "Shortening", sub: "Butter" },
        { item: "Butter", sub: "For every 1 C, use 3/4 C olive oil" },
    ]

  return (
    <Container>
    <Card className='conversions'>
        <CardTitle className='conversion-title'>
            Substitution Guide
        </CardTitle>
        <p className='substitution-title'>Healthier</p>
        {
            healthyConversions.map((conversion, idx) => {
                return ( 
                    <Row key={idx} className='sub-row'>
                        <Col>{conversion.item}</Col>
                        <Col>{conversion.sub}</Col>
                    </Row>
                )
            })
        }
        <p className="substitution-title">Vegan</p>
        {
            veganConversions.map((conversion, idx) => {
                return (
                    <Row key={idx} className='sub-row'>
                        <Col>{conversion.item}</Col>
                        <Col>{conversion.sub}</Col>
                    </Row>
                )
            })
        }
    </Card>
    </Container>
  )
}
